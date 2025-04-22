<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class Candidate extends Model
{
    use HasApiTokens,Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
            'phone',
            'email',
            'password',
    ];
    protected $hidden = [ 'password'];
    protected $casts = [
        'password'=> 'hashed'
    ];
}
