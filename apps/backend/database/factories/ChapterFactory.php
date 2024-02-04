<?php

namespace Database\Factories;

use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chapter>
 */
class ChapterFactory extends Factory
{

    public static int $NUMBER_CHAPTERS = 0;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => "Kap " . ++self::$NUMBER_CHAPTERS,
            'chapter_nbr' => self::$NUMBER_CHAPTERS,
            'course_id' => Course::inRandomOrder()->first()->id,
            'paid' => fake()->boolean(0.8),
            'published' => fake()->boolean(0.8),
            'randomize' => fake()->boolean(0.8),
        ];
    }
}
