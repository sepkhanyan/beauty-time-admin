<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Laravue\JsonResponse;
use App\Laravue\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    /**
     * Display categories list.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $categories = Category::orderBy('sort_id', 'ASC')->with('types');
        $categories = $categories->title($request->title);
        $categories = $categories->get();
        return response()->json(new JsonResponse(['categories' => $categories, 'total' => count($categories)]));
    }

    /**
     * Store a newly category.
     *
     * @param  \app\Http\Requests\StoreCategoryRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreCategoryRequest $request)
    {
        $data = $request->all();
        $category = Category::create($data);
        $types = array_map(
            function ($type) {
                return $type['id'];
            },
            $data['types']
        );
        $category->types()->attach($types);
        $category->load('types');
        return response()->json(new JsonResponse(['category' => $category]));
    }

    /**
     * Show specified category.
     *
     * @param  $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Category $category)
    {
        $category->load('services');
        return response()->json(new JsonResponse(['category' => $category]));
    }

    /**
     * Update the specified category.
     *
     * @param  \app\Http\Requests\StoreCategoryRequest  $request
     * @param  $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(StoreCategoryRequest $request, Category $category)
    {
        $data = $request->all();
        $category->update($data);
        $types = array_map(
            function ($type) {
                return $type['id'];
            },
            $data['types']
        );
        $category->types()->sync($types);
        $category->load('types');
        return response()->json(new JsonResponse(['category' => $category]));
    }

    /**
     * Categories sorting.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sort(Request $request)
    {
        $data = $request->all();
        foreach ($data as $key => $value){
            Category::whereId($value)->update(['sort_id' => $key + 1]);
        }
        return response()->json(new JsonResponse(['status' => 'success']));
    }
}
