<?php

namespace App\Laravue\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Company Type
 *
 * @package App
 */
class CompanyType extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $table = 'company_types';

    protected $fillable = [
        'title', 'description', 'number_of_companies', 'archived'
    ];

    public function scopeTitle($query, $val)
    {
        if (!empty($val)) {
            return $query->where('title', 'LIKE', '%' . $val . '%');
        }
    }

    public function categories()
    {
        return $this->belongsToMany('App\Laravue\Models\Category', 'category_has_types',  'category_id','type_id');
    }

}
