<?php

namespace App\Data;

use App\Models\User;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[typescript]
class UserData extends Data
{
    public function __construct(
        //
        public string $public_id,
        public string $first_name,
        public string $last_name,
        public string $email,
        public string $username,
    ) {
    }

    public function fromModel(User $user): self
    {
        return new self(
            public_id: $user->public_id,
            first_name: $user->first_name,
            last_name: $user->last_name,
            email: $user->email,
            username: $user->username,
        );
    }
}
