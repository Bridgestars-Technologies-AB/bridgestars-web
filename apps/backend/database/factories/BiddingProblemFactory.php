<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BiddingProblem>
 */
class BiddingProblemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'hands_visible' => 2,
            'presentation' => fake()->sentence(),
            'solution' => fake()->sentences(2),
        ];
    }
}
