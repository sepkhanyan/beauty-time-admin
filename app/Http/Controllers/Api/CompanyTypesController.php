<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreCompanyTypeRequest;
use App\Laravue\JsonResponse;
use App\Laravue\Models\CompanyType;
use Illuminate\Http\Request;

class CompanyTypesController extends BaseController
{
    /**
     * Display company types list.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $companyTypes = CompanyType::where('archived', 0);
        $companyTypes = $companyTypes->title($request->title);
        $companyTypes = $companyTypes->get();
        return response()->json(new JsonResponse(['types' => $companyTypes, 'total' => count($companyTypes)]));
    }

    /**
     * Store a new company type.
     *
     * @param  \app\Http\Requests\StoreCompanyTypeRequest   $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreCompanyTypeRequest $request)
    {
        $data = $request->all();
        $companyType = CompanyType::create($data);
        return response()->json(new JsonResponse(['type' => $companyType]));
    }
    /**
     * Display the specified company type.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified company type.
     *
     * @param  \app\Http\Requests\StoreCompanyTypeRequest  $request
     * @param  $companyType
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(StoreCompanyTypeRequest $request, CompanyType $companyType)
    {
        $data = $request->all();
        $companyType->update($data);
        return response()->json(new JsonResponse(['type' => $companyType]));
    }

    /**
     * Remove the specified company type.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        //
    }
}
