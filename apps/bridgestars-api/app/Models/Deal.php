<?php

namespace App\Models;

use App\Enums\Direction;
use App\Models\Concerns\HasPublicId;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Deal extends Model
{
    use HasFactory;
    use HasPublicId;

    public function biddingProblems(): HasMany
    {
        return $this->hasMany(BiddingProblem::class);
    }

    public function leadProblems(): HasMany
    {
        return $this->hasMany(LeadProblem::class);
    }

    public function visibleBids(int $progress, Direction $player)
    {
        return $this->bidding()->where('suboptimal', '=', false)->take(
            $this->bidIndex($progress, $player)
        )->get();
    }

    public function bidding(): HasMany
    {
        return $this->hasMany(Bidding::class)->orderBy('bidding_nbr');
    }

    public function dealer(): Direction
    {
        return Direction::from($this->dealer);
    }

    /**
     * @return Collection<Bidding>
     */
    public function nextBid(int $progress, Direction $player): Collection
    {
        return $this->bidding()
            ->where('bidding_nbr', '=', $this->bidIndex($progress, $player))
            ->get();
    }

    private function bidIndex(int $progress, Direction $player): int
    {
        $diff = abs($this->dealer()->bidding_table_order() - $player->bidding_table_order());

        return $progress * 4 + $diff;
    }
}
