<?php

namespace App\Http\Controllers\AuthOld;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): \Illuminate\Http\Response
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->noContent(200);
/*            return redirect()->intended(
                config('app.frontend_url').RouteServiceProvider::HOME.'?verified=1'
            );*/
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

/*        return redirect()->intended(
            config('app.frontend_url').RouteServiceProvider::HOME.'?verified=1'
        );*/
        return response()->noContent(200);
    }
}
