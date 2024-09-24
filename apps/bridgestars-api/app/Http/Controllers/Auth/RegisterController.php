<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class RegisterController extends Controller
{
    public function __invoke()
    {
        // TODO: Implement __invoke() method.
        $validated = request()->validate([
            'username' => ['required', 'string', 'max:25', Rule::unique(User::class)],
            'email' => ['required', 'string', 'email', 'max:150', Rule::unique(User::class)],
            'password' => [
                'required',
                'confirmed',
                app()->environment(['local', 'testing'])
                    ? Password::min(8)
                    : Password::min(8)->uncompromised(),
            ],
            'firstName' => ['required', 'string', 'max:50'],
            'lastName' => ['required', 'string', 'max:50'],
        ]);

        $user = User::create([
            'username' => strtolower($validated['username']),
            'first_name' => ucfirst($validated['firstName']),
            'last_name' => ucfirst($validated['lastName']),
            'email' => strtolower($validated['email']),
            'password' => bcrypt($validated['password']),
        ]);

        $token = $user->createToken(
            name: 'auth_token',
            abilities: [],
            expiresAt: now()->addMonths(2)
        );

        // if (app()->environment('production')){
        //send mail to notify admin, or slack/discord
        // }
        // send mail to client

        return ['token' => $token->plainTextToken];

    }
}
