<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use Illuminate\Http\Request;

class EmployerController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string',
            'phone' => 'required|integer|unique:employers|min:10',
            'email' => 'required|email|unique:employers',
            'password' => 'required|string|confirmed',
        ]);

        $employer = Employer::create([
            'company_name' => $validated['company_name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);

        $token = $employer->createToken('EmployerAccess')->plainTextToken;

        return response()->json([
            'employer' => $employer,
            'access_token' => $token,
        ]);
    }
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $employer = Employer::where('email', $validated['email'])->first();

        $token = $employer->createToken('EmployerAccess')->plainTextToken;

        return response()->json([
            'employer' => $employer,
            'access_token' => $token,
        ]);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
