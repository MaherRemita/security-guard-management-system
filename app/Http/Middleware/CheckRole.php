<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {

        // Check if user has required role
        if (!in_array($request->user()->user_type, ...$roles)) {
            return response()->json(['message' => 'User does not have the required role.'], 403);
        }

        return $next($request);
    }
}
