<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpFoundation\Response;

class EnsureAppKeyIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $app_key = $request->header('X-Api-Key');
        if(!$app_key || $app_key !== config('app.api_key')){
            throw new UnauthorizedException('Invalid app key.');
        }
        return $next($request);
    }
}
