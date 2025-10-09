<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiAuthController extends Controller
{
    //login 
    public function login(Request $request)
    {
        // validate the credntials 
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // attempt to login
        if ( !Auth::attempt($credentials) ) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        // get the authenticated user
        $user = Auth::user();
        // generate token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token], 200);
    }

    // log out
    public function logout()
    {
        // get the authenticated user
        $user = Auth::user();
        // revoke token
        $user->currentAccessToken()->delete();
        
        return response()->json(['message' => 'Logged out successfully'],200);
    }
}
