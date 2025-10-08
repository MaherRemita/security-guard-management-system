<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    // create 
    public function create(array $data): User
    {
        // hash password
        $data['password'] = bcrypt($data['password']);
        // create user
        $user = User::create($data);
        
        return $user;
    }
}
