<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Bidding;
use App\Models\BiddingProblem;
use App\Models\BiddingResult;
use App\Models\Chapter;
use App\Models\Course;
use App\Models\Deal;
use App\Models\User;
use Database\Factories\BiddingFactory;
use Database\Factories\BiddingProblemFactory;
use Database\Factories\ChapterFactory;
use Database\Factories\CourseFactory;
use Database\Factories\DealFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        User::factory()->create([
            'username' => 'testuser',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        Course::factory(5)
            ->has(Chapter::factory(5)
                ->has(BiddingProblem::factory(10)
                    ->state(['deal_id' => 1])
                )
            )->create();

        $problems = BiddingProblem::all();
        foreach ($problems as $problem) {
            $problem->deal()->associate(
                Deal::factory()
                    ->has(Bidding::factory(rand(4, 10)))
                    ->create()
            );
            $problem->biddingResults()->createMany(
                BiddingResult::factory()
                    ->count(rand(1, 5))
                    ->for(User::inRandomOrder()->first())->make()->toArray()
            );
        }
    }
}
