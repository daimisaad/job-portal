<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CandidateToken extends Model
{
    protected $fillable = [
        'candidate_id','token'
    ];
}
