<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\CandidateToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CandidateController extends Controller
{
    public function register(Request $request){
        $validated = $request->validate([
            'first_name'=>'required|string',
            'last_name'=>'required|string',
            'phone'=>'required|unique:candidates|min:10',
            'email'=>'required|email|unique:candidates',
            'password'=>'required|string|confirmed',
        ]);

        $candidate = Candidate::create([
            'first_name'=>$validated['first_name'],
            'last_name'=>$validated['last_name'],
            'phone'=>$validated['phone'],
            'email'=>$validated['email'],
            'password'=>$validated['password'],
        ]);

        $token = Str::random(60);

        CandidateToken::create([
            'candidate_id'=>$candidate->id,
            'token'=> $token
        ]);

        return response()->json([
            'candidate'=> $candidate,
            'access_token'=> $token,
        ]);
    }
    public function login(Request $request){
        $validated = $request->validate([
            'email'=>'required|email',
            'password'=>'required|string',
        ]);

        $candidate = Candidate::where('email',$validated['email'])->first();


        $token = Str::random(60);

        CandidateToken::create([
            'candidate_id'=>$candidate->id,
            'token'=> $token
        ]);

        return response()->json([
            'employer'=> $candidate,
            'access_token'=> $token,
        ]);
    }
    public function logout(Request $request)
{
    $authHeader = $request->header('Authorization');


        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }


        $token = substr($authHeader, 7);

        CandidateToken::where('token',$token)->delete();

        return response()->json(['success'=> 'Log Out Has Successfuly'],200);
}
}
