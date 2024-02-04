<?php

namespace App\Models;

use App\Models\Concerns\HasPublicId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BiddingProblem extends Model
{
    use HasFactory;
    use HasPublicId;

    public function deal()
    {
        return $this->belongsTo(Deal::class);
    }
}
