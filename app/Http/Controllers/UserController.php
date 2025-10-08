<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Services\UserService;
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

}
