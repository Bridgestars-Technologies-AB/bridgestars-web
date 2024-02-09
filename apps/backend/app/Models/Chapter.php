<?php

namespace App\Models;

use App\Models\Concerns\HasPublicId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

class Chapter extends Model
{
    use HasFactory;
    use HasPublicId;

    public function bidding(): Collection
    {
           return $this->bidding;
    }
    public function explanations(): Collection
    {
           return $this->explanations;
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function biddingProblems(): HasMany
    {
        return $this->hasMany(BiddingProblem::class);
    }

    public function leadProblems(): HasMany
    {
        return $this->hasMany(LeadProblem::class);
    }

    public function problems(): HasMany
    {
        return $this->biddingProblems()->union(function () {
            return $this->leadProblems();
        });
    }
}
