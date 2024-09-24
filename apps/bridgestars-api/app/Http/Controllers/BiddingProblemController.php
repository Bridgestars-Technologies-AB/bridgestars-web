<?php

namespace App\Http\Controllers;

use App\Data\BiddingProblemData;
use App\Models\BiddingProblem;
use App\Models\BiddingResult;

class BiddingProblemController extends Controller
{
    public function show(BiddingProblem $problem)
    {
        $result = $problem->getOrCreateOngoingResult(auth()->user());
        $nbr = $problem->chapter->hasManyThrough(BiddingResult::class, BiddingProblem::class)
            ->where('user_id', auth()->id())
            ->count();

        return BiddingProblemData::from(
            $problem,
            $result,
            ($nbr - 1) % 10 + 1, // 1-10 instead of 0-9
            10
        );
    }
}
