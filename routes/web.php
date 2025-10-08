<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return redirect()->route('login.index');
});


// Auth routes
Route::get('/login', [AuthController::class, 'index'])->name('login.index');
Route::post('/login', [AuthController::class, 'login'])->name('login');



// admin routes
Route::middleware('auth')->name('admin.')->group(function () {
    Route::get('/users', function () {
        return Inertia::render('Dashboard/Users');
    })->name('users.index');

});
