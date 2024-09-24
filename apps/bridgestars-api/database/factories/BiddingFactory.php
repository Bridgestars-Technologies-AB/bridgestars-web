<?php

namespace Database\Factories;

use App\Enums\Bid;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bidding>
 */
class BiddingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'bidding_nbr' => fake()->numberBetween(1, 10),
            'bid' => fake()->randomElement(array_slice(Bid::all(), 0, 20)),
            'explanation' => fake()->randomElement(['', fake()->sentence()]),
            'suboptimal' => false,
        ];
    }
}
