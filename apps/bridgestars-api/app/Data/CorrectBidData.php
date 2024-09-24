<?php

namespace App\Data;

use App\Models\Bidding;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\LiteralTypeScriptType;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[typescript]
class CorrectBidData extends Data
{
    /**
     * @param  Collection<BidData>  $bidding
     */
    public function __construct(
        public string $bid,
        public string $explanation,
        public Collection $bidding,
        #[LiteralTypeScriptType('true')]
        public bool $correct,
        #[LiteralTypeScriptType('false')]
        public bool $finished,
    ) {
    }

    /**
     * @param  Collection<Bidding>  $bids
     */
    public static function fromBids(Bidding $played, Collection $visible_bids)
    {
        return [
            'correct' => true,
            'finished' => false,
            'bid' => $played->bid,
            'explanation' => $played->explanation,
            'bidding' => BidData::collect($visible_bids),
        ];
    }
}
