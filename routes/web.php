<?php

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return redirect()->route('login.index');
});


// Auth routes
Route::get('/login', [AuthController::class, 'index'])->name('login.index');
Route::post('/login', [AuthController::class, 'login'])->name('login');
// logout
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


// admin routes
Route::middleware('auth')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        // get the total customers
        $customersCount = User::where('user_type','CUSTOMER')->count();
        // get total guards 
        $guardsCount = User::where('user_type','GUARD')->count();

        return Inertia::render('Dashboard/Index',['customer_count' => $customersCount, 'guard_count' => $guardsCount]);
    })->name('dashboard');

    Route::get('/users', function () {
        return Inertia::render('Dashboard/Users');
    })->name('users.index');

    Route::get('/settings', function () {
        return Inertia::render('Dashboard/Settings');
    })->name('settings');
});
