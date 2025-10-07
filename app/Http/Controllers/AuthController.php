<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // login page 
    public function index()
    {
        return Inertia::render('Auth/Login');
    }

    // login (admin)
    public function login(LoginRequest $request)
    {
        // get the validated credentials from the request
        $credentials = $request->validated();
        // add the user_type condition
        $credentials['user_type'] = 'ADMIN';

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return redirect()->intended('dashboard');
        }

        return redirect()->back()->withErrors(['message' => 'Invalid credentials']);
    }
}
