<?php

namespace App\Data;

use App\Models\BiddingProblem;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[typescript]
class BiddingProblemData extends Data
{
    /**
     * @param Collection<HandData> $cards
     */
    public function __construct(
        public string $public_id,
        public int $number,
        public int $total,
        public string $presentation,
        public int $hands_visible,
        public Collection $cards,
    ) {}

    public static function fromModel(BiddingProblem $biddingProblem): self
    {
        $deal = $biddingProblem->deal;
        $cards  = explode(' ', $biddingProblem->deal->cards);
        $deal->dealer;

        Log::info($deal);

        return new self(
            public_id: $biddingProblem->public_id,
            number: 1,
            total: 10,
            presentation: $biddingProblem->presentation,
            hands_visible: $biddingProblem->hands_visible,
            cards: Collection::empty()
        );
    }
}
