<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Job extends Model
{

    /** @use HasFactory<\Database\Factories\JobFactory> */
    use HasFactory,Notifiable;
    protected $fillable = [
        'employer_id',
        'company_name',
        'title',
        'location',
        'minSalary',
        'maxSalary',
        'jobType',
        'category',
        'description',
        'requirements',
        'benefits',
        'skills',
    ];
    protected $casts = [
        'requirements' => 'array',
        'benefits' => 'array',
        'skills' => 'array',
    ];
}
