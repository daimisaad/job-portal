<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employer_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('company');
            $table->string('location');
            $table->integer('minSalary')->nullable();
            $table->integer('maxSalary')->nullable();
            $table->string('jobType');
            $table->string('category');
            $table->text('description');
            $table->json('requirements')->nullable();
            $table->json('benefits')->nullable();
            $table->json('skills')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
