<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\SalonUpdateRequest;
use App\Http\Requests\StoreSalonRequest;
use App\Laravue\Acl;
use App\Laravue\JsonResponse;
use App\Laravue\Models\Role;
use App\Laravue\Models\Salon;
use App\Laravue\Models\User;
use App\Mail\SalonCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SalonsController extends BaseController
{
    /**
     * Display salons list.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $salons = Salon::with('user');
        $salons = $salons->name($request->salon_name);
        $salons = $salons->status($request->status);
        $salons = $salons->get();
        return response()->json(new JsonResponse(['salons' => $salons, 'total' => count($salons)]));
    }

    /**
     * Store a newly salon.
     *
     * @param  \app\Http\Requests\StoreSalonRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreSalonRequest $request)
    {
        $data = $request->except('timestamp');
        $user = User::create($data['user']);
        $managerRole = Role::findByName(Acl::ROLE_MANAGER);
        $user->syncRoles($managerRole);
        $salon = $user->salon()->create($data['salon']);
        Mail::to($user)->send(new SalonCreated($data['user']));
        $salon->load('user');
        return response()->json(new JsonResponse(['salon' => $salon]));
    }

    /**
     * Display the specified salon.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified salon.
     *
     * @param  \app\Http\Requests\SalonUpdateRequest  $request
     * @param  $salon
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(SalonUpdateRequest $request, Salon $salon)
    {
        $data = $request->all();
        $salon->update($data);
        return response()->json(new JsonResponse(['salon' => $salon]));
    }

    /**
     * Remove the specified salon.
     *
     * @param  $salon
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Salon $salon)
    {
        $salon->delete();
        return response()->json(new JsonResponse(['status' => 'success']));
    }
}
