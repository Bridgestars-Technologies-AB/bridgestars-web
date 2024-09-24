<?php

namespace App\Data;

use App\Enums\Bid;
use App\Models\Bidding;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\LiteralTypeScriptType;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[typescript]
class IncorrectBidData extends Data
{
    public function __construct(
        public Bid $bid,
        public string $explanation,
        #[LiteralTypeScriptType('false')]
        public bool $correct = false,
        #[LiteralTypeScriptType('false')]
        public bool $finished = false,
    ) {
    }

    public static function fromString(string $bid)
    {
        return [
            'correct' => false,
            'finished' => false,
            'bid' => Bid::from($bid),
            'explanation' => 'Det var inte riktigt rätt.', // TODO: randomize
        ];
    }

    public static function fromModel(Bidding $bid)
    {
        return [
            'correct' => false,
            'finished' => false,
            'bid' => Bid::from($bid->bid),
            'explanation' => 'Det var inte riktigt rätt.', // TODO: bid->explanation
        ];

    }
}
