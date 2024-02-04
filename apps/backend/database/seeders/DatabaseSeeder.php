<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Bidding;
use App\Models\BiddingProblem;
use App\Models\Chapter;
use App\Models\Course;
use App\Models\Deal;
use App\Models\User;
use Database\Factories\ChapterFactory;
use Database\Factories\CourseFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Course::factory(5)
            ->has(Chapter::factory(5)
                ->has(BiddingProblem::factory(10)
                    ->for(Deal::factory()->has(Bidding::factory()))
                )
            )->create();
    }
}
