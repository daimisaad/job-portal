<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class Employer extends Model
{
    use HasApiTokens,Notifiable;
    protected $fillable = [
        'company_name',
            'phone',
            'email',
            'password',
    ];
    protected $hidden = ['email', 'password'];
    protected $casts = [
        'password'=> 'hashed'
    ];
}
