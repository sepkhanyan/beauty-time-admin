<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Laravue\JsonResponse;
use App\Laravue\Models\CategoryService;
use Illuminate\Http\Request;

class CategoryServicesController extends Controller
{
    /**
     * Display company types list.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $services = CategoryService::whereCategoryId($request->category_id)->orderBy('sort_id', 'ASC')->get();
        return response()->json(new JsonResponse(['services' => $services]));
    }

    /**
     * Store a newly category service.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = $request->all();
        foreach ($data as $service){
            $categoryService = CategoryService::updateOrCreate(
                ['id' => $service['id'], 'category_id' => $service['category_id']],
                ['service' => $service['service']]
            );
        }
        $categoryServices = CategoryService::whereCategoryId($data[0]['category_id'])->get();
        return response()->json(new JsonResponse(['services' => $categoryServices, 'total' => count($categoryServices)]));
    }


    /**
     * Update the specified category service.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  $categoryService
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, CategoryService $categoryService)
    {
        $data = $request->all();
        $categoryService->update($data);
        return response()->json(new JsonResponse(['service' => $categoryService]));
    }

    /**
     * Category services sorting.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sort(Request $request)
    {
        $data = $request->all();
        foreach ($data as $key => $value){
            CategoryService::whereId($value)->update(['sort_id' => $key + 1]);
        }
        return response()->json(new JsonResponse(['status' => 'success']));
    }

    /**
     * Remove the specified category service.
     *
     * @param  $categoryService
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(CategoryService $categoryService)
    {
        $categoryService->delete();
        return response()->json(new JsonResponse(['status' => 'success']));
    }
}
