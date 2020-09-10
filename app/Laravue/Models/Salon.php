<?php

namespace App\Laravue\Models;

use Illuminate\Database\Eloquent\Model;

class Salon extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $table = 'salons';

    protected $fillable = [
        'user_id', 'name', 'phone_number', 'status'
    ];

    public function user()
    {
        return $this->belongsTo('App\Laravue\Models\User');
    }

    public function scopeName($query, $val)
    {
        if (!empty($val)) {
            return $query->where('name', 'LIKE', '%' . $val . '%');
        }
    }

    public function scopeStatus($query, $val)
    {
        if (!empty($val)) {
            if ($val == 'all'){
                return $query;
            }else{
                return $query->where('status', $val);
            }
        }
    }

}
