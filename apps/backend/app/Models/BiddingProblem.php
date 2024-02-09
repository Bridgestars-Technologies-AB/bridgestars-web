<?php

namespace App\Models;

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

    public function chapter(): BelongsTo
    {
        return $this->belongsTo(Chapter::class);
    }

    public function biddingResults(): HasMany
    {
        return $this->hasMany(BiddingResult::class);
    }
}
