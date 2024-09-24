<?php

namespace App\Data;

use App\Enums\Direction;
use App\Models\BiddingProblem;
use App\Models\BiddingResult;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[typescript]
class BiddingProblemData extends Data
{
    /**
     * @param  Collection<HandData>  $cards
     * @param  Collection<BidData>  $bidding
     *  */
    public function __construct(
        public string $public_id,
        public int $number,
        public int $total,
        public int $progress,
        public string $presentation,
        public int $hands_visible,
        public Collection $cards,
        public Direction $dealer,
        public Direction $player,
        public Collection $bidding,
    ) {
    }

    public static function fromModel(BiddingProblem $biddingProblem, BiddingResult $result, int $number, int $total = 10): self
    {
        $deal = $biddingProblem->deal;
        $pbn = $biddingProblem->deal->cards;
        $cards = Collection::empty();
        $player = $biddingProblem->player();
        $dealer = $deal->dealer();
        $hands_visible = $biddingProblem->hands_visible;

        if ($hands_visible >= 1) {
            $cards->add(HandData::fromPBN($pbn, $player));
        }
        if ($hands_visible >= 2) {
            $cards->add(HandData::fromPBN($pbn, $player->opposite()));
        }
        if ($hands_visible >= 4) {
            $cards->add(HandData::fromPBN($pbn, $player->next()));
            $cards->add(HandData::fromPBN($pbn, $player->next()->opposite()));
        }

        $bidding = $deal->visibleBids(
            $result->progress,
            $player,
        );
        $biddingData = BidData::collect($bidding);

        return new self(
            public_id: $biddingProblem->public_id,
            number: $number,
            total: $total,
            progress: $result->progress,
            presentation: $biddingProblem->presentation,
            hands_visible: $biddingProblem->hands_visible,
            cards: $cards,
            dealer: $dealer,
            player: $player,
            bidding: $biddingData
        );
    }
}
