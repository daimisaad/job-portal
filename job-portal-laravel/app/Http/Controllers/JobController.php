<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'employer_id' => 'required',
            'company_name' => 'required',
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'experience' => 'required|string|max:30',
            'minSalary' => 'nullable|numeric|min:0',
            'maxSalary' => 'nullable|numeric|gt:minSalary',
            'jobType' => 'required|string',
            'category' => 'required|string',
            'description' => 'required|string',
            'requirements' => 'required|array',
            'requirements.*' => 'string',
            'benefits' => 'nullable|array',
            'benefits.*' => 'string',
            'skills' => 'nullable|array',
            'skills.*' => 'string',
        ]);


        Job::create([
            'employer_id' => $validatedData['employer_id'],
            'company_name' => $validatedData['company_name'],
            'title' => $validatedData['title'],
            'location' => $validatedData['location'],
            'experience' => $validatedData['experience'],
            'minSalary' => $validatedData['minSalary'] ?? null,
            'maxSalary' => $validatedData['maxSalary'] ?? null,
            'jobType' => $validatedData['jobType'],
            'category' => $validatedData['category'],
            'description' => $validatedData['description'],
            'requirements' => $validatedData['requirements'] ?? [],
            'benefits' => $validatedData['benefits'] ?? [],
            'skills' => $validatedData['skills'] ?? [],
        ]);

        return response()->json([
            'message' => 'Job posting created successfully.',
        ], 201);
    }

    public function getData()
    {
        $jobs = Job::all();
        return response()->json(compact('jobs'), 201);
    }
}
