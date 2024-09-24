<?php

namespace App\Data;

use App\Enums\Bid;
use App\Models\Bidding;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[typescript]
class BidData extends Data
{
    public function __construct(
        //
        public Bid $bid,
        public string $explanation,
    ) {
    }

    public static function fromModel(Bidding $bidding): self
    {
        return new self(
            bid: Bid::from(strtoupper($bidding->bid)),
            explanation: $bidding->explanation,
        );
    }
}
