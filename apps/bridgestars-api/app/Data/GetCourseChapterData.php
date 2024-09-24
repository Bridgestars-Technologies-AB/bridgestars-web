<?php

namespace App\Data;

use App\Models\Chapter;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class GetCourseChapterData extends Data
{
    public function __construct(
        //
        public string $public_id,
        public string $name,
        public int $chapter_nbr,
        public bool $paid,
        public string $next_problem_id,
        public int $current_problem,
        public int $total_problems,
    ) {
    }

    public static function fromModel(Chapter $chapter)
    {
        $problem_query = $chapter->biddingProblems()
            ->where('published', '=', true);
        if ($chapter->randomize) {
            $problem_query->inRandomOrder($chapter->id);
        }
        $problem = $problem_query
            //->skip(2)
            ->limit(1)
            ->select('public_id')
            ->firstOrFail();

        return new self(
            $chapter->public_id,
            $chapter->name,
            $chapter->chapter_nbr,
            $chapter->paid,
            $problem->public_id,
            1,
            10
        );
    }
}
