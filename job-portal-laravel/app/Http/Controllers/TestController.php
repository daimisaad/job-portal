<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function testpost(Request $request){
        $test = $request->validate([
            'email'=> 'required|email',
            'name'=> 'required'
        ]);

        if(!$test){
            return response()->json(['error'=>"Error"]);
        }


        return response()->json(['success'=>"the data have Success"]);
    }
}
