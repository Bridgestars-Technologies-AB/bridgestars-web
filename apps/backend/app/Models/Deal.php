<?php

namespace App\Models;

use App\Models\Concerns\HasPublicId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Deal extends Model
{
    use HasFactory;
    use HasPublicId;

    public function bidding(): HasMany
    {
        return $this->hasMany(Bidding::class);
    }

    public function biddingProblems(): HasMany
    {
        return $this->hasMany(BiddingProblem::class);
    }

    public function leadProblems(): HasMany
    {
        return $this->hasMany(LeadProblem::class);
    }
}
