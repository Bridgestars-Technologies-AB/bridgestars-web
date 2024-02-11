<?php

namespace App\Data;

use App\Enums\Direction;
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
     * @param Collection<BidData> $bidding
     *  */
    public function __construct(
        public string     $public_id,
        public int        $number,
        public int        $total,
        public string     $presentation,
        public int        $hands_visible,
        public Collection $cards,
        public Direction  $dealer,
        public Direction  $player,
        public Collection $bidding,
    )
    {
    }

    public static function fromModel(BiddingProblem $biddingProblem): self
    {
        $deal = $biddingProblem->deal;
        $pbn = $biddingProblem->deal->cards;
        $cards = Collection::empty();
        $player = Direction::from($biddingProblem->player);
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

        return new self(
            public_id: $biddingProblem->public_id,
            number: 1,
            total: 10,
            presentation: $biddingProblem->presentation,
            hands_visible: $biddingProblem->hands_visible,
            cards: $cards,
            dealer: Direction::from($deal->dealer),
            player: Direction::from($biddingProblem->player),
            bidding: BidData::collect($deal->bidding)
        );
    }
}
