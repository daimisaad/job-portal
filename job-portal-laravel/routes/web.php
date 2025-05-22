<?php

use App\Http\Controllers\CandidateController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\JobController;
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
Route::post('/employer/get', [EmployerController::class, 'getEmployer'])->name('employers.get');


// Candidate
Route::post('/candidate/register', [CandidateController::class, 'register'])->name('candidates.register');
Route::post('/candidate/login', [CandidateController::class, 'login'])->name('candidates.login');
Route::middleware(CandidateAuthToken::class)->post('/candidate/logout', [CandidateController::class, 'logout'])->name('candidates.logout');
Route::post('/candidate/get', [CandidateController::class, 'getCandidate'])->name('candidates.get');

// Jobs

Route::post('/job/store',[JobController::class,'store'])->name('jobs.store');
Route::get('/job/get',[JobController::class,'getData'])->name('jobs.get');

require __DIR__ . '/auth.php';
