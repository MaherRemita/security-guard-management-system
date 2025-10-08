<?php

namespace App\Services;

use Exception;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

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

    // get all with search and filters
    public function getAll(array $filters = []): LengthAwarePaginator
    {
        // search and filter users (exclude admins)
        $users = User::search($filters['search'] ?? '')
                        ->whereNotIn('user_type',['ADMIN']) // exclude admins
                        ->when(isset($filters['user_type']), function ($query) use ($filters) {
                            $query->where('user_type', $filters['user_type']);
                        })
                        ->paginate(15);

        return $users;
    }
    
    // delete 
    public function delete(int $id): User
    {
        // find user
        $user = User::find($id);
        if (!$user) {
           throw new Exception('User not found');
        }
        // delete user
        $user->delete();
        
        return  $user;
    }
}
