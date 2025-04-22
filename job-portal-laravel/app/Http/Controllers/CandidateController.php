<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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

        $token = $candidate->createToken('CandidateAccess')->plainTextToken;

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

        $token = $candidate->createToken('CandidateAccess')->plainTextToken;

        return response()->json([
            'employer'=> $candidate,
            'access_token'=> $token,
        ]);
    }
    public function logout(Request $request)
{
    $authHeader = $request->header('Authorization');

    if ($authHeader && str_starts_with($authHeader, 'Bearer ')) {
        $tokenString = substr($authHeader, 7); // example: "1|T1o4ASdf..."

        // Split ID and raw token
        [$id, $plainToken] = explode('|', $tokenString, 2);

        // Find token row by ID
        $record = DB::table('personal_access_tokens')->where('id', $id)->first();

        if ($record && Hash::check($plainToken, $record->token)) {
            DB::table('personal_access_tokens')->where('id', $id)->delete();
            return response()->json(['message' => 'Logged out successfully']);
        }
    }

    return response()->json(['message' => 'Invalid token'], 401);
}
}
