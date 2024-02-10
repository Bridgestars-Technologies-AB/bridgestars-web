<?php

namespace App\Data;

use App\Models\Course;
use App\Data\ChapterData;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CourseData extends Data
{
    /**
     * @param string $public_id
     * @param string $name
     * @param int $course_nbr
     * @param Collection<ChapterData> $chapters
     */
    public function __construct(
      //
        public string $public_id,
        public string $name,
        public int $course_nbr,
        public string $description,
        public string $color,
        public Collection $chapters
    ) {}

    public static function fromModel(Course $course)
    {
        Log::info($course->chapters);
        return new self(
            $course->public_id,
            $course->name,
            $course->course_nbr,
            $course->description,
            $course->color,
            ChapterData::collect($course->chapters)
        );
    }
}
