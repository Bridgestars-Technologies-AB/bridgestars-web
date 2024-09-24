<?php

namespace App\Http\Controllers;

use App\Data\BidAnalysisData;
use App\Data\CorrectBidData;
use App\Data\IncorrectBidData;
use App\Enums\Bid;
use App\Models\BiddingProblem;
use Illuminate\Validation\Rule;

class BiddingController extends Controller
{
    public function bid(BiddingProblem $problem)
    {
        $validated = request()->validate([
            'bid' => ['required', Rule::in(Bid::all())],
        ]);

        $deal = $problem->deal;

        // get bidding-results
        $result = $problem->ongoingResults()
            ->where('user_id', '=', auth()->id())
            ->first();

        if (! $result) {
            return response()->json(['message' => 'Du har ingen aktiv övning'], 400);
        }
        // get the valid bids to play
        $next_bids = $deal->nextBid($result->progress, $problem->player());
        // no valid bids to play
        if ($next_bids->isEmpty()) {
            return response()->json(['message' => 'Det finns inga fler bud, (du borde se analys nu)'], 400);
        }

        // check if the bid is valid
        $found = $next_bids->where('bid', '=', $validated['bid']);
        if ($found->isEmpty()) {
            $result->update([
                'errors' => $result->errors + 1,
            ]);

            return IncorrectBidData::fromString($validated['bid']);
        }

        $bid = $found->first();

        if ($bid->suboptimal) {
            $result->update([
                'errors' => $result->errors + 1,
            ]);

            return IncorrectBidData::fromModel($bid);
        }

        $finished = $deal->nextBid($result->progress + 1, $problem->player())->isEmpty();
        if (! $finished) {
            $result->update([
                'progress' => $result->progress + 1,
            ]);
            $visible = $deal->visibleBids($result->progress, $problem->player());

            return CorrectBidData::fromBids($bid, $visible);
        } else {
            $result->update([
                'progress' => $result->progress + 1,
                'completed' => true,
            ]);

            return BidAnalysisData::fromModel($problem, $result);
        }
    }

    public function surrender(BiddingProblem $problem)
    {
        $result = $problem->getOrCreateOngoingResult(auth()->user());
        $result->update([
            'surrendered' => true,
            'completed' => false,
        ]);

        return BidAnalysisData::fromModel($problem, $result);
    }
}
