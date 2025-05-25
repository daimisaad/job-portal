<?php

namespace Database\Seeders;

use App\Models\Job;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Job::factory(15);
        Job::create([
            'employer_id' => 1,
            'company_name' => 'lujayna',
            'title' => fake()->title(),
            'location' => 'Rabat',
            'experience' => 'intermediare',
            'minSalary' => fake()->numberBetween(2000, 20000),
            'maxSalary' => fake()->numberBetween(25000, 40000),
            'jobType' => 'Part Time',
            'category' => 'Technologie',
            'description' => fake()->text(150),
            'requirements' => ['more Than 5years experience'],
            'benefits' => ['good Salary'],
            'skills' => ['React', 'PHP', 'MySql'],
        ]);
    }
}
