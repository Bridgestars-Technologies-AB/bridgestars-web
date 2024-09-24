<?php

namespace App\Models;

use App\Enums\Direction;
use App\Models\Concerns\HasPublicId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BiddingProblem extends Model
{
    use HasFactory;
    use HasPublicId;

    public function deal(): BelongsTo
    {
        return $this->belongsTo(Deal::class);
    }

    public function bidding(): \LaravelIdea\Helper\App\Models\_IH_Bidding_QB|\Illuminate\Database\Eloquent\Builder
    {
        return Bidding::query()->where('deal_id', '=', $this->deal_id)
            ->where('suboptimal', '=', 'false')
            ->orderBy('bidding_nbr');
    }

    public function player(): Direction
    {
        return Direction::from($this->player);
    }

    public function chapter(): BelongsTo
    {
        return $this->belongsTo(Chapter::class);
    }

    public function ongoingResults(): HasMany
    {
        return $this->hasMany(BiddingResult::class)
            ->where('completed', '=', false)
            ->where('surrendered', '=', false);
    }

    public function getOrCreateOngoingResult(User $user): BiddingResult
    {
        return $this->ongoingResults()
            ->where('user_id', '=', $user->id)
            ->firstOrCreate(['user_id' => $user->id])->fresh();
    }

    public function completedResults(): HasMany
    {
        return $this->hasMany(BiddingResult::class)
            ->where('completed', '=', true);
    }

    public function surrenderedResults(): HasMany
    {
        return $this->hasMany(BiddingResult::class)
            ->where('surrendered', '=', true);
    }

    public function biddingResults(): HasMany
    {
        return $this->hasMany(BiddingResult::class);
    }
}
