<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employer_id' => 1,
            'company_name' => 'lujayna',
            'title' => fake()->title(),
            'location' => 'Rabat',
            'minSalary' => fake()->numberBetween(2000, 20000),
            'maxSalary' => fake()->numberBetween(25000, 40000),
            'jobType' => 'Part Time',
            'category' => 'Technologie',
            'description' => fake()->text(150),
            'requirements' => ['more Than 5years experience'],
            'benefits' => ['good Salary'],
            'skills' => ['React', 'PHP', 'MySql'],
        ];
    }
}
