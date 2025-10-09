<?php

use App\Http\Controllers\UserController;


Route::middleware(['web', 'auth'])->group(function () {
    // list all users api
    Route::get('/users', [UserController::class, 'showAll']);
    // pairs of users whose ages sum to the given number
    Route::get('/user-pairs/{sum}', [UserController::class, 'findPairsByAgeSum']);
    // age distribution
    Route::get('/age-distribution', [UserController::class, 'ageDistribution']);
});

