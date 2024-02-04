<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Deal>
 */
class DealFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cards' => 'AK87.KQ2.QT6.854 93.J863.K74.QJT9 QJ5.A75.J52.AK32 T642.T94.A983.76',
            'dealer' => fake()->randomElement(['N', 'E', 'S', 'W']),
            'vul' => fake()->randomElement(['None', 'NS', 'EW', 'Both']),
        ];
    }
}
