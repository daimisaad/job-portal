<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use App\Models\EmployerToken;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EmployerController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|unique:employers',
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

        $token = Str::random(60);

        EmployerToken::create([
            'employer_id'=>$employer->id,
            'token'=> $token
        ]);

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

        $token = Str::random(60);

        EmployerToken::create([
            'employer_id'=>$employer->id,
            'token'=> $token
        ]);

        return response()->json([
            'employer' => $employer,
            'access_token' => $token,
        ]);
    }
    public function logout(Request $request)
{
    $authHeader = $request->header('Authorization');


        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }


        $token = substr($authHeader, 7);

        EmployerToken::where('token',$token)->delete();

        return response()->json(['success'=> 'Log Out Has Successfuly'],200);
}
public function getEmployer(Request $request){
    $id = EmployerToken::where('token',$request->token)->first()['employer_id'];
    $employer = Employer::where('id',$id)->first();

    return response()->json(['employer'=>$employer]);
}

}
