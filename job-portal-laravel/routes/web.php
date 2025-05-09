<?php

use App\Http\Controllers\CandidateController;
use App\Http\Controllers\EmployerController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Middleware\CandidateAuthToken;
use App\Http\Middleware\EmployerAuthToken;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::post('/test', [TestController::class, 'testpost']);

// Employer

Route::post('/employer/register', [EmployerController::class, 'register'])->name('employers.register');
Route::post('/employer/login', [EmployerController::class, 'login'])->name('employers.login');
Route::middleware(EmployerAuthToken::class)->post('/employer/logout', [EmployerController::class, 'logout'])->name('employers.logout');


// Candidate
Route::post('/candidate/register', [CandidateController::class, 'register'])->name('candidates.register');
Route::post('/candidate/login', [CandidateController::class, 'login'])->name('candidates.login');
Route::middleware(CandidateAuthToken::class)->post('/candidate/logout', [CandidateController::class, 'logout'])->name('candidates.logout');

require __DIR__ . '/auth.php';
