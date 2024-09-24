<?php

namespace App\Importers;

use App\Enums\Direction;
use App\Http\Controllers\Controller;
use App\Models\Bidding;
use App\Models\BiddingProblem;
use App\Models\Chapter;
use App\Models\Deal;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class BridgeToBridge extends Controller
{
    public function __invoke(Chapter $chapter)
    {
        $validated = request()->validate([
            'deals' => ['required', 'array'],
            'deals.*.cards' => ['required_array_keys:south,north,east,west'],
            'deals.*.cards.*' => ['required_array_keys:hearts,diamonds,clubs,spades'],
            'deals.*.bidding' => ['required', 'array'],
            'deals.*.dealer' => ['required', 'in:north,east,south,west'],
            'deals.*.player' => ['required', 'in:north,east,south,west'],
            'deals.*.vul' => ['required', 'in:none,ns,ew,both'],
            'deals.*.solution' => ['required', 'string'],
            'deals.*.presentation' => ['required', 'string'],
            'deals.*.hands-visible' => ['required', 'int'],
            'deals.*.problem_id' => ['required', 'unique:bidding_problems,bridgetobridge_id'], // save so we know which ones has been imported
        ]);
        $problems = Collection::empty();
        $deals = $validated['deals'];
        foreach ($deals as $deal) {
            $pbn = '';
            $dealer = Direction::from($deal['dealer']);
            $pbn .= $dealer->value . ':';
            foreach (Direction::cases() as $dir) {
                $p_cards = $deal['cards'][$dir->label];
                $pbn .= implode('.', [
                    $p_cards['spades'],
                    $p_cards['hearts'],
                    $p_cards['diamonds'],
                    $p_cards['clubs']]
                ) . ' ';
            }
            $pbn = trim($pbn);

            $biddings = Collection::empty();
            $bidding_nbr = 0;
            foreach ($deal['bidding'] as $bids) {
                $suboptimal = false;
                foreach ($bids as $bid) {
                    $biddings->add(Bidding::make([
                        'bidding_nbr' => $bidding_nbr,
                        'bid' => $bid[0],
                        'explanation' => $bid[1] ?? '',
                        'suboptimal' => $suboptimal,
                    ]));
                    $suboptimal = true;
                }
                $bidding_nbr++;
            }

            DB::beginTransaction();
            $dealModel = Deal::create([
                'cards' => $pbn,
                'dealer' => $dealer->value,
                'vul' => $deal['vul'],
            ]);
            $problems->add(
                BiddingProblem::create([
                        'hands_visible' => $deal['hands-visible'],
                        'solution' => $deal['solution'],
                        'presentation' => $deal['presentation'],
                        'deal_id' => $dealModel->id,
                        'player' => Direction::fromLongName($deal['player']),
                        'published' => true, // TODO: change to false
                        'bridgetobridge_id' => $deal['problem_id'],
                        'chapter_id' => $chapter->id,
                    ]));
            $dealModel->bidding()->saveMany($biddings);
            DB::commit();
        }

        return response()->json([
            'message' => 'Problemen har importerats till kapitel "' . $chapter->name . '" med id: [' . implode(', ', $problems->map(fn ($p) => $p->public_id)->toArray()) . '].',
        ]);
    }
}
