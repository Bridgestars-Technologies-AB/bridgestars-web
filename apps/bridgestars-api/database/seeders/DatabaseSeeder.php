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
            'username' => 'Maggan12',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);
        User::factory()->create([
            'username' => 'pribri',
            'email' => 'test2@example.com',
            'password' => Hash::make('bralösenord'),
        ]);
        User::factory()->create([
            'username' => 'malmöbridge',
            'email' => 'test3@example.com',
            'password' => Hash::make('bralösenord'),
        ]);
        User::factory()->create([
            'username' => 'arnebridge',
            'email' => 'test4@example.com',
            'password' => Hash::make('bralösenord'),
        ]);

        $jayParsedAry = [
        ];

        $courses = Course::factory()
            ->createMany([
                ['name' => 'Bridge A - Nybörjarkurs'],
                ['name' => 'Bridge B - Fortsättningskurs'],
            ]);
        foreach ($courses as $course) {
            $chapters = Chapter::factory()
                ->for($course)
                ->createMany([
                    ['name' => 'Kap 1 - Öppningsbudet 1NT'],
                    ['name' => 'Kap 2 - Vad heter detta kapitlet?'],
                ]);
        }

        $deal = Deal::create([
            'cards' => 'N:KT9.KJ854.Q9.AQ2 863.T62.8752.973 AJ4.AQ.AKJ6.KT65 Q752.973.T43.J84',
            'dealer' => 'N',
        ]);
        $biddings = Bidding::factory()->for($deal)->createMany([['bid' => '1NT', 'explanation' => 'Jämn hand och 15-17 hp', 'bidding_nbr' => 1], ['bid' => 'Pass', 'explanation' => '', 'bidding_nbr' => 2], ['bid' => '7NT', 'explanation' => 'Minst 22 hp', 'bidding_nbr' => 3, 'suboptimal' => false], ['bid' => '3NT', 'explanation' => '10-15 hp', 'bidding_nbr' => 3, 'suboptimal' => true], ['bid' => '4NT', 'explanation' => '', 'bidding_nbr' => 3, 'suboptimal' => true], ['bid' => '6NT', 'explanation' => '18-19 hp', 'bidding_nbr' => 3, 'suboptimal' => true], ['bid' => 'Pass', 'explanation' => '', 'bidding_nbr' => 4], ['bid' => 'Pass', 'explanation' => '', 'bidding_nbr' => 5], ['bid' => 'Pass', 'explanation' => '', 'bidding_nbr' => 6]]);

        $deal2 = Deal::create([
            'cards' => 'N:65.T75.KJ93.AKT9 QJ8.K9.AQ8752.54 AKT3.QJ3.T64.KQ2 9742.A8642..8763',
            'dealer' => 'S',
        ]);
        $biddings = Bidding::factory()->for($deal2)->createMany([['bid' => '1NT', 'explanation' => 'Jämn hand och 15-17 hp', 'bidding_nbr' => 1], ['bid' => 'Pass', 'explanation' => '', 'bidding_nbr' => 2], ['bid' => '2NT', 'explanation' => '9 hp, invit till utgång', 'bidding_nbr' => 3], ['bid' => 'Pass', 'explanation' => '', 'bidding_nbr' => 4], ['bid' => 'Pass', 'explanation' => 'Minimum för öppningsbudet 1NT', 'bidding_nbr' => 5], ['bid' => '3NT', 'explanation' => 'Har du min eller max?', 'bidding_nbr' => 5, 'suboptimal' => true], ['bid' => 'Pass', 'explanation' => '', 'bidding_nbr' => 6]]);
        foreach (Bidding::all() as $bidding) {
            $bidding->update(['bidding_nbr' => $bidding->bidding_nbr - 1]);
        }

        foreach (Chapter::all() as $chapter) {
            BiddingProblem::factory(1)->for($chapter)->for($deal)->create([
                'presentation' => 'Din partner öppnar med 1NT, vad svarar du?',
                'solution' => 'Gränsen för att bjuda **storslam** är minst **37 hp** tillsammans. Du vet att ni är tillräckligt starka och bjuder 7NT direkt.',
                'player' => 'S',
                'hands_visible' => 2,
            ]);
            BiddingProblem::factory(1)->for($chapter)->for($deal2)->create([
                'player' => 'S',
                'presentation' => 'Räkna dina hp, vad öppnar du med?',
                'solution' => 'Du inleder med **1NT för att berätta om en jämn hand och 15-17 hp**. Din partner inviterar med 2NT som frågar "om du har min eller max i intervallet 15 - 17 hp". Du har minimum och väljer att passa på inviten.  ',
                'hands_visible' => 2,
            ]);
        }

        //BiddingProblem::factory(1)->for($deal)->for($chapters)->create();

        //BiddingProblem::factory()->for($deal)->

        // ------  Random data --------
        /*        Deal::factory(50)
                    ->has(Bidding::factory(rand(4,10)))
                    ->create();

                Course::factory(5)
                    ->has(Chapter::factory(5)
                        ->has(BiddingProblem::factory(10)
                            ->has(BiddingResult::factory()
                                ->count(rand(1, 5))
                            )
                        )
                    )->create();*/
    }
}
