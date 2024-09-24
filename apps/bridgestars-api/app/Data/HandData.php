<?php

namespace App\Data;

use App\Enums\Direction;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[typescript]
class HandData extends Data
{
    public function __construct(
        public Direction $player,
        public string $S,
        public string $H,
        public string $D,
        public string $C,
    ) {
    }

    public static function fromPBN(string $pbn, Direction $player): self
    {
        $sep = explode(':', $pbn);
        $first = Direction::from($sep[0]);
        $cards = explode(' ', $sep[1]);
        $cards = explode('.', $cards[($player->order() + $first->order()) % 4]);

        return new self(
            player: $player,
            S: $cards[0],
            H: $cards[1],
            D: $cards[2],
            C: $cards[3],
        );
    }
}
