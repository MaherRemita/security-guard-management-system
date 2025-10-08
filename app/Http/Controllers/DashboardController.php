<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $customersCount = User::where('user_type', 'CUSTOMER')->count();
        $guardsCount = User::where('user_type', 'GUARD')->count();

        return Inertia::render('Dashboard/Index', [
            'customer_count' => $customersCount,
            'guard_count' => $guardsCount
        ]);
    }
}
