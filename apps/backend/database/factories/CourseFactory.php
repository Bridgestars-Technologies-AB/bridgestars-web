<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    public static int $NUMBER_COURSES = 0;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => "Bridge " . ++self::$NUMBER_COURSES,
            'course_nbr' => self::$NUMBER_COURSES,
            'color' => fake()->regexify('#[a-f0-9]{6}'),
            'published' => fake()->boolean(90),
            'description' => fake()->text(200),
        ];
    }
}
