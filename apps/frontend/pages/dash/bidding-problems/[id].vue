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

// this function will create the correct history depending on who the dealer is
// inserting as many "invisible" blocks as needed
function createHistory(history: Array<Bid>): Array<Bid> {
  const dealer = biddingProblem.dealer;
  if (dealer === "N") {
    return [Bid.placeholder(), history].flat();
  }
  if (dealer === "E") {
    return [Bid.placeholder(), Bid.placeholder(), history].flat();
  }
  if (dealer === "S") {
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

console.log(biddingProblem.dealer);

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

//contract received when the problem is finished
const contract = ref(new Bid(0, 0));

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
  contract.value = Bid.fromString(data.contract);
};

// Checks if solution is correct
// emited from bidding-problem
async function check(playedBid: Bid) {
  bid.value = playedBid;
  // Here we ask the backend if {suit, rank} is correct, and then we
  // get a response if it was correct and data needed for that situation
  // Will be simulated with a function returning a random response
  //axios.post(`/prefix/bidding-problem/${route.params.id}`, { bid: bid.getShortName }) ->
  // will add types later
  const { data } = await api.post<
    IncorrectBidData | CorrectBidData | BidAnalysisData
  >(`/bidding-problems/${route.params.id}/bid`, { bid: playedBid.toString() });

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
    contract.value = Bid.fromString(data.contract);
    setTimeout(() => {
      pass.value = true;
      solution.value = data.solution;
      nextProblemId.value = data.next_problem_id;
    }, 500);
  }
}
</script>

<template>
  <div class="h-full w-full">
    <div
      v-if="!pass"
      class="h-full w-full max-w-[1500px] mx-auto flex flex-col justify-center items-center"
    >
      <!-- 1 av 10 -->
      <div
        class="w-1/2 max-w-[800px] min-w-[200px] h-[50px] mb-1 bg-white dark:bg-dark-100 rounded-xl flex justify-center items-center"
      >
        <span class="text-[30px] text-dark dark:text-dark dark:text-white"
          >Giv {{ biddingProblem.number }} av {{ biddingProblem.total }}</span
        >
      </div>

      <!-- Bidding problem -->
      <game-bidding-problem
        v-model:bid="bid"
        :presentationText="presentationText"
        :history="biddingHistory"
        :hands="hands"
        :handsVisible="2"
        :player="biddingProblem.player"
        @makeBid="check"
      ></game-bidding-problem>

      <!-- Bidding explanation -->
      <div
        :class="`mt-2 flex w-full max-w-[1000px] flex-row justify-center items-center space-x-1 ${
          isBidMade ? '' : 'invisible'
        }`"
      >
        <div
          :class="`w-1/2 h-[130px] bg-white dark:bg-dark-100 rounded-xl flex flex-col justify-center items-center`"
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
          class="w-1/2 pt-2 px-2 text-center h-[130px] bg-white dark:bg-dark-100 rounded-xl flex flex-col justify-center items-center space-y-2"
        >
          <span class="text-[16px] text-dark dark:text-light"
            >Om du kört fast på en giv, klicka nedan för att komma till
            lösningen.</span
          >
          <button
            class="w-[150px] h-[40px] bg-[#0e9f6e] rounded-xl text-white dark:text-white font-semibold p-2"
            @click="surrender"
          >
            Se lösningen
          </button>
        </div>
      </div>
    </div>
    <div v-else class="w-full h-full flex justify-center items-center">
      <game-analysis-main
        :biddingResult="biddingHistory"
        :hands="hands"
        :solution="contract"
        :player="biddingProblem.player"
        :handsVisible="biddingProblem.hands_visible"
        :biddingAnswer="solution"
        :nextProblemId="nextProblemId"
      ></game-analysis-main>
    </div>
  </div>
</template>
<style scoped>
div,
span {
  @apply transition-colors duration-300;
}
</style>
