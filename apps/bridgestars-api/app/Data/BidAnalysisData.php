<?php

namespace App\Data;

use App\Enums\Bid;
use App\Enums\Direction;
use App\Models\BiddingProblem;
use App\Models\BiddingResult;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\LiteralTypeScriptType;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[typescript]
class BidAnalysisData extends Data
{
    /**
     * @param  bool  $finished
     * @param  Collection<HandData>  $cards
     * @param  Collection<BidData>  $bidding
     */
    public function __construct(
        public bool $correct,
        public int $stars,
        public string $next_problem_id,
        public Collection $cards,
        public string $solution,
        public Collection $bidding,
        public Bid $contract,

        #[LiteralTypeScriptType('true')]
        public bool $finished = true,
        //public Direction $contract_dir
    ) {
    }

    public static function fromModel(BiddingProblem $problem, BiddingResult $result)
    {
        $next_id = BiddingProblem::inRandomOrder()->where('chapter_id', '=', $problem->chapter_id)->where('id', '!=', $problem->id)->first()->public_id;
        $cards = Collection::empty();
        foreach (Direction::cases() as $dir) {
            $cards->add(HandData::fromPBN($problem->deal->cards, $dir));
        }
        $bidding = BidData::collect($problem->bidding()->get());
        $final_dir = Direction::fromOrder(($problem->deal->dealer()->order() + $problem->bidding()->count()) % 4);

        return [
            'finished' => true,
            'correct' => ! $result->surrendered,
            'stars' => $result->surrendered ? 0 : max(3 - $result->errors, 0),
            'next_problem_id' => $next_id,
            'cards' => $cards,
            'solution' => $problem->solution, 'Du har 18 hp och vet att din partner har 15-17 hp. Ni har tillsammans 33-35 hp och gränsen för att bjuda lillslam är minst 33 hp. Rätt bud är 6NT.',
            'bidding' => $bidding,
            'contract' => $bidding->filter(fn ($b) => $b->bid !== Bid::pass())->last()->bid,
            'contract_dir' => $final_dir,
        ];
    }
}
