<?php

use App\Http\Controllers\UserController;


Route::middleware(['web', 'auth'])->group(function () {
    // list all users api
    Route::get('/users', [UserController::class, 'showAll']);
});