<?php

namespace App\Data;

use App\Models\Course;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class GetCourseData extends Data
{
    /**
     * @param  Collection<GetCourseChapterData>  $chapters
     */
    public function __construct(
        //
        public string $public_id,
        public string $name,
        public int $course_nbr,
        public string $description,
        public string $color,
        public Collection $chapters
    ) {
    }

    public static function fromModel(Course $course)
    {
        $chapters = $course->chapters;

        return new self(
            $course->public_id,
            $course->name,
            $course->course_nbr,
            $course->description,
            $course->color,
            GetCourseChapterData::collect($chapters)
        );
    }
}
