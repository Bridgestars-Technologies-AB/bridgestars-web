<?php

namespace App\Models;

use App\Models\Concerns\HasPublicId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bidding extends Model
{
    use HasFactory;
    use HasPublicId;

    public function deal(): BelongsTo
    {
        return $this->belongsTo(Deal::class);
    }
}
