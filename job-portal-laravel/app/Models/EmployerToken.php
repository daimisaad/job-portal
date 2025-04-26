<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployerToken extends Model
{
    protected $fillable = [
        'employer_id','token'
    ];
}
