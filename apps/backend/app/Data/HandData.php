<?php

namespace App\Data;

use App\Enums\Player;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[typescript]
class HandData extends Data
{
    public function __construct(
        public Player $player,
        public string $S,
        public string $H,
        public string $D,
        public string $C,
    ) {}

}
