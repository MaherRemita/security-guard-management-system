<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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
    public function store(StoreUserRequest $request)
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
    public function showAll(Request $request)
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
}
