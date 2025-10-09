<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ApiAuthController;

// Part 1 apis
Route::middleware(['web', 'auth'])->group(function () {
    // list all users api
    Route::get('/users', [UserController::class, 'showAll']);
    // pairs of users whose ages sum to the given number
    Route::get('/user-pairs/{sum}', [UserController::class, 'findPairsByAgeSum']);
    // age distribution
    Route::get('/age-distribution', [UserController::class, 'ageDistribution']);
});


// Part 2 apis

// login
Route::post('/login', [ApiAuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function (){
    // logout
    Route::post('/logout', [ApiAuthController::class, 'logout']);
});
