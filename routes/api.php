<?php

use App\Http\Controllers\UserController;


// list all users api
Route::get('/users', [UserController::class, 'showAll']);