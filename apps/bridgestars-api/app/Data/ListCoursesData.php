<?php

namespace App\Data;

use App\Models\Course;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ListCoursesData extends Data
{
    /**
     * @param  Collection<ListCoursesChapterData>  $chapters
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
        return new self(
            $course->public_id,
            $course->name,
            $course->course_nbr,
            $course->description,
            $course->color,
            ListCoursesChapterData::collect($course->chapters)->sortBy('name')->take(3)
        );
    }
}
