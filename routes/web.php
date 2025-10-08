<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return redirect()->route('login.index');
});


// Auth routes
Route::get('/login', [AuthController::class, 'index'])->name('login.index');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Admin routes
Route::middleware('auth')->prefix('admin')->group(function () {
    // dashboard route
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // users routes
    Route::prefix('users')->name('users.')->group(function (){
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::post('/create', [UserController::class, 'store'])->name('store');
        Route::delete('/delete/{id}', [UserController::class, 'destroy'])->name('destroy');
    });
});