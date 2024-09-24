<?php

namespace App\Models;

use App\Models\Concerns\HasPublicId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;
    use HasPublicId;

    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class)->orderBy('chapter_nbr');
    }

    public function recent_chapters(): HasMany
    {
        return $this->chapters()->limit(3);
    }
}
