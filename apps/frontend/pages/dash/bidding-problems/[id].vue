<script setup lang="ts">
import { Bid } from "~/composables/biddingClasses/Bid";
import type {
  BiddingProblemData,
  BidAnalysisData,
  CorrectBidData,
  IncorrectBidData,
} from "~/types/generated";

const route = useRoute();

const { data } = await api.get(`bidding-problems/${route.params.id}`);
const biddingProblem = data as BiddingProblemData;
console.log(biddingProblem.dealer);

// this function will create the correct history depending on who the dealer is
// inserting as many "invisible" blocks as needed
function createHistory(history: Array<Bid>): Array<Bid> {
  const dealer = biddingProblem.dealer;
  if (dealer === "W") {
    return [Bid.placeholder(), history].flat();
  }
  if (dealer === "N") {
    return [Bid.placeholder(), Bid.placeholder(), history].flat();
  }
  if (dealer === "E") {
    return [
      Bid.placeholder(),
      Bid.placeholder(),
      Bid.placeholder(),
      history,
    ].flat();
  }
  return history;
}

// used as v-model to be able to see the latest bid made
const bid = ref(new Bid(0, 0));

// refs to keep track of the state of the problem
const isBidMade = ref(false);
const pass = ref(false);

//bidding information that will be showed during the bidding-problem
const presentationText = ref(biddingProblem.presentation);
const biddingHistory = ref(createHistory(Bid.fromJson(biddingProblem.bidding)));

//bidding information that will be showed when problem is finished
const biddingExplanation = ref("");
const solution = ref("");
const nextProblemId = ref("");
const hands = biddingProblem.cards.map((hand) => new Hand(hand));

const surrender = async () => {
  // will add types later
  const { data } = await api.post<BidAnalysisData>(
    `/bidding-problems/${route.params.id}/surrender`,
  );
  // new data: data.stars (number of stars, 1-3)
  pass.value = true;
  solution.value = data.solution;
  nextProblemId.value = data.next_problem_id;
  biddingHistory.value = createHistory(Bid.fromJson(data.bidding));
};

// Checks if solution is correct
// emited from bidding-problem
async function check() {
  // Here we ask the backend if {suit, rank} is correct, and then we
  // get a response if it was correct and data needed for that situation
  // Will be simulated with a function returning a random response
  //axios.post(`/prefix/bidding-problem/${route.params.id}`, { bid: bid.getShortName }) ->
  // will add types later
  const { data } = await api.post<
    IncorrectBidData | CorrectBidData | BidAnalysisData
  >(`/bidding-problems/${route.params.id}/bid`, { bid: bid.value.toString() });

  if (!data.correct && !data.finished) {
    // InvalidBid
    biddingExplanation.value = data.explanation;
    isBidMade.value = true;
  }
  if (data.correct && !data.finished) {
    // CorrectBid
    presentationText.value = data.explanation;
    biddingHistory.value = createHistory(Bid.fromJson(data.bidding));
    isBidMade.value = false;
  }
  if (data.finished) {
    // BidAnalysisData
    // hade varit nice att animera in buden.
    biddingHistory.value = createHistory(Bid.fromJson(data.bidding));
    setTimeout(() => {
      pass.value = true;
      solution.value = data.solution;
      nextProblemId.value = data.next_problem_id;
    }, 500);
  }
}
</script>

<template>
  <div class="w-full h-full justify-center items-center">
    <div
      v-if="!pass"
      class="w-full h-full flex flex-col justify-center items-center"
    >
      <div
        class="w-[500px] h-[50px] mb-1 bg-dark-100 rounded-xl flex justify-center items-center"
      >
        <span class="text-[30px] text-dark dark:text-white"
          >Giv {{ biddingProblem.number }} av {{ biddingProblem.total }}</span
        >
      </div>
      <game-bidding-problem
        v-model:bid="bid"
        :presentationText="presentationText"
        :history="biddingHistory"
        :hands="hands"
        :handsVisible="biddingProblem.hands_visible"
        :player="biddingProblem.player"
        @check="check"
      ></game-bidding-problem>
      <div
        :class="`mt-2 flex flex-row justify-center items-center space-x-1 ${
          isBidMade ? '' : 'invisible'
        }`"
      >
        <div
          :class="`w-[500px] h-[100px] bg-dark-100 rounded-xl flex flex-col justify-center items-center`"
        >
          <div class="flex flex-row justify-center items-center">
            <span class="text-[20px] text-dark dark:text-white">
              Du bjöd {{ bid.getShortName() }}
            </span>
            <span v-if="bid.is('SUIT')" :class="bid.tailwindSuitSymbol()">
            </span>
          </div>

          <span class="text-[20px] text-dark dark:text-white">
            {{ biddingExplanation }}
          </span>
        </div>
        <div
          class="w-[500px] h-[100px] bg-dark-100 rounded-xl flex flex-col justify-center items-center space-y-2"
        >
          <span class="text-[16px] text-dark dark:text-white"
            >Om du kört fast på en giv, klicka nedan för att komma till
            lösningen</span
          >
          <button
            class="w-[150px] h-[40px] bg-[#0e9f6e] rounded-xl text-dark dark:text-white font-semibold"
            @click="surrender"
          >
            Gå till lösning
          </button>
        </div>
      </div>
    </div>
    <div v-else class="w-full h-full flex justify-center items-center">
      <game-analysis-main
        :biddingResult="biddingHistory"
        :hands="hands"
        :solution="bid"
        :player="biddingProblem.player"
        :handsVisible="biddingProblem.hands_visible"
        :biddingAnswer="solution"
        :nextProblemId="nextProblemId"
      ></game-analysis-main>
    </div>
  </div>
</template>
