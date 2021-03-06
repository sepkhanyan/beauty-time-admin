<?php

namespace App\Laravue\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoryService extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $table = 'category_services';

    protected $fillable = [
        'service', 'category_id', 'sort_id'
    ];

    public function category()
    {
        return $this->belongsTo('App\Laravue\Models\Category');
    }
}
