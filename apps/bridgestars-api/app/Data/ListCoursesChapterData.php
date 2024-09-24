<?php

namespace App\Data;

use App\Models\Chapter;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[typescript]
class ListCoursesChapterData extends Data
{
    public function __construct(
        //
        public string $public_id,
        public string $name,
        public float $progress,
    ) {
    }

    public static function fromModel(Chapter $chapter)
    {
        return new self(
            $chapter->public_id,
            $chapter->name,
            0.8
        );
    }
}
