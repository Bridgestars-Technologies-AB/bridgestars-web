<?php

namespace App\Http\Controllers\Internal;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Laravel\Sanctum\PersonalAccessToken;

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
                    : Password::min(10)->uncompromised(),
            ],
            'name' => ['required', 'string', 'max:100'],
        ]);

        $user = User::create([
            'username' => strtolower($validated['username']),
            'name' => $validated['name'],
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
