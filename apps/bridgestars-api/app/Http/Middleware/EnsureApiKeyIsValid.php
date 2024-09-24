<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureApiKeyIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $api_key = $request->header('X-Api-Key');
        if (! $api_key || $api_key !== config('app.api_key')) {
            //abort(403, 'Invalid Api Key.');
            return response(['message' => 'Invalid Api Key.'], 403);
        }

        return $next($request);
    }
}
