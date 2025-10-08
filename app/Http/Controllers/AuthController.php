<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class AuthController extends Controller
{
    // login page 
    public function index()
    {
        return Inertia::render('Auth/Login');
    }

    // login (admin)
    public function login(LoginRequest $request): RedirectResponse
    {
        // get the validated credentials from the request
        $credentials = $request->validated();
        // add the user_type condition
        $credentials['user_type'] = 'ADMIN';

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return redirect()->intended('/users');
        }

        return redirect()->back()->withErrors(['message' => 'Invalid credentials']);
    }

    // logout
    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
    
        $request->session()->invalidate();
    
        $request->session()->regenerateToken();
    
        return redirect('/login');
    }
}
