<?php

namespace App\Http\Controllers\Internal;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Lang;

class LoginController extends Controller
{
    public function __invoke()
    {
       $validated = request()->validate([
           'token_name' => ['string', 'max:100'],
           'username' => ['required', 'string', 'max:100'],
           'password' => ['required', 'string']
       ]);

       $usernameOrEmail = strtolower($validated['username']);
       $user = User::where('username', $usernameOrEmail)
           ->orWhere('email', $usernameOrEmail)
           ->first();

       if(! $user || !Hash::check($validated['password'], $user->password)){
           return response()->json([
               'message' => Lang::get('auth.failed')
           ], 401);
       }

         $token = $user->createToken(
              name: $validated['token_name'] ?? 'auth_token',
              abilities: [],
              expiresAt: now()->addMonths(2)
         );

       return ['token' => $token->plainTextToken];
    }
}
