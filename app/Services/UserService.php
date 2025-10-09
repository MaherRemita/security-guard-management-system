<?php

namespace App\Services;

use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Http\Resources\UserResource;
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

    // pairs of users whose ages sum to the given number
    public function findPairsByAgeSum(int $sum): array
    {
        // min & max ages
        $minPossibleAge = 15;
        $maxPossibleAge = 75;

        // Calculate the age range of users we actually need to check
        $minAgeToFetch = max($minPossibleAge, $sum - $maxPossibleAge);
        $maxAgeToFetch = min($maxPossibleAge, $sum - $minPossibleAge);

        // If the required age range is invalid (e.g., max is less than min),
        // then no pairs are possible.
        if ($maxAgeToFetch < $minAgeToFetch) {
            return [
                'pairs_count' => 0,
                'pairs' => []
            ];
        }

        // Convert the age range to a date of birth range
        $latestDoB = Carbon::now()->subYears($minAgeToFetch)->endOfDay();
        $earliestDoB = Carbon::now()->subYears($maxAgeToFetch + 1)->startOfDay();

        // Fetch ONLY the users within the possible date of birth range
        $users = User::whereBetween('date_of_birth', [$earliestDoB, $latestDoB])->get();

        // applying the hash map approach to find pairs
        $ageMap = [];
        $pairs = [];
        foreach ($users as $user) {
            $complement = $sum - $user->age;
            if (isset($ageMap[$complement])) {
                foreach ($ageMap[$complement] as $matchedUser) {
                    $pairs[] = [UserResource::make($matchedUser), UserResource::make($user)];
                }
            }
            $ageMap[$user->age][] = $user;
        }

        return [
            'pairs_count' => count($pairs),
            'pairs' => $pairs
        ];
    }
}
