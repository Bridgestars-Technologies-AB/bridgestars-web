<?php

namespace Database\Factories;

use App\Enums\Bids;
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
            'bid' => fake()->randomElement(Bids::all()),
            'explanation' => fake()->sentence(),
            'suboptimal' => false,
        ];
    }
}
