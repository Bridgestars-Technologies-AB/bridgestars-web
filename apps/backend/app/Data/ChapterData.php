<?php

namespace App\Data;

use App\Models\Chapter;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ChapterData extends Data
{
    public function __construct(
      //
        public string $public_id,
        public string $name,
        public int $chapter_nbr,
        public bool $paid,
    ) {}


    public static function fromModel(Chapter $chapter)
    {
        return new self(
            $chapter->public_id,
            $chapter->name,
            $chapter->chapter_nbr,
            $chapter->paid,
        );
    }
}
