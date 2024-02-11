<?php

namespace App\Http\Controllers;

use App\Data\BiddingProblemData;
use App\Models\Bidding;
use App\Models\BiddingProblem;
use Illuminate\Http\Request;

class BiddingProblemController extends Controller
{
    public function show(BiddingProblem $bidding_problem)
    {
        return BiddingProblemData::from($bidding_problem);
    }

    public function bid(BiddingProblem $bidding_problem)
    {

    }
}
