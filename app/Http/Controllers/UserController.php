<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Resources\UserResource;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\User\StoreUserRequest;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController extends Controller
{
    public function __construct(
        protected UserService $userService,
    ) {}
    
    // index page
    public function index(): Response
    {
        return Inertia::render('Dashboard/Users');
    }

    // store
    public function store(StoreUserRequest $request): RedirectResponse  
    {
        // get user data from the request 
        $data = $request->validated();
        // provide a defult value for the password (because it's not provided in the input)
        $data['password'] = 'password';
        
        try {
            // create user 
            $this->userService->create($data);

            return redirect()
                ->back()
                ->with('success', 'User created successfully');

        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['message' => $e->getMessage()]);
        }

    }  

    // show all 
    public function showAll(Request $request): AnonymousResourceCollection
    {
        // since the validation is simple i will not use for request here and follow the standard validation approach
        $data = $request->validate([
            // search
            'search' => 'string|max:50',
            // filters
            'user_type' => 'in:CUSTOMER,GUARD',
        ]);
        // get users 
        $users = $this->userService->getAll($data);

        return UserResource::collection($users);
    }

    // delete
    public function destroy($id): RedirectResponse
    {
        try {
            // delete user 
            $this->userService->delete($id);

            return redirect()
                ->back()
                ->with('success', 'User deleted successfully');

        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withErrors(['message' => $e->getMessage()]);
        }
    }

    // pairs of users whose ages sum to the given number
    public function findPairsByAgeSum($sum): array
    {
        return $this->userService->findPairsByAgeSum((int)$sum);
    }
}
