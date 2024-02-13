<script setup lang="ts">
import { Bid } from "~/composables/biddingClasses/Bid";
import type { BiddingProblemData } from "~/types/generated";

const route = useRoute();

const { data } = await api.get(`bidding-problems/${route.params.id}`);
const biddingProblem = data as BiddingProblemData;
console.log(biddingProblem.dealer);

//axios.get(`/prefix/bidding-problem/${id}`) -> response.data
// Mock up response data:
// const biddingProblem = {
//   number: 1, // problem 1 out of 10 in this chapter (deal_nbr)
//   total: 10,
//   presentation:
//     "Vad bjuder du som svarshand när din partner har öppnat med 1 NT?",
//   hands_visible: 1, // [1,2,4] bara min, mitt lag eller alla
//   cards: [
//     {
//       player: "N",
//       spades: "Q876",
//       hearts: "AT4",
//       diamonds: "KJ3",
//       clubs: "KJ3",
//     },
//   ],
//   dealer: "N", // North starts the auction
//   player: "E", // Vem spelar vi som??
//   bidding: [
//     { bid: "1NT", explanation: " 0 - 8 hp" },
//     { bid: "PASS" },
//     { bid: "3NT", explanation: " 10 - 15 hp" },
//   ],
// };

//Mock up response from server when playing a bid ....
const bidResponseList = [
  {
    correct: false,
    finished: false,
    bid: "2NT",
    explanation: "Det var inte riktigt rätt",
  },
  {
    correct: true,
    finished: false,
    bid: "2NT",
    explanation: "Du spelade 2NT, det visar hmm hmm hmm",
    bidding: [
      { bid: "3NT", explanation: " 0 - 8 hp, nord visar styrka" },
      { bid: "pass" },
      { bid: "5H" },
    ],
  },
  {
    correct: true,
    finished: true,
    next_problem_id: "sjNDASL283aD",
    cards: [
      {
        player: "N",
        S: "Q876",
        H: "AT4",
        D: "KJ3",
        C: "KJ3",
      },
      {
        player: "E",
        S: "Q876",
        H: "AT4",
        D: "KJ3",
        C: "KJ3",
      },
      {
        player: "S",
        S: "Q876",
        H: "AT4",
        D: "KJ3",
        C: "KJ3",
      },
      {
        player: "W",
        S: "Q876",
        H: "AT4",
        D: "KJ3",
        C: "KJ3",
      },
    ],
    solution:
      "Du har 18 hp och vet att din partner har 15-17 hp. Ni har tillsammans 33-35 hp och gränsen för att bjuda lillslam är minst 33 hp. Rätt bud är 6NT.",
    bidding: [
      { bid: "1NT", explanation: " 0 - 8 hp" },
      { bid: "pass" },
      { bid: "3NT", explanation: " 10 - 15 hp" },
    ],
  },
];

// this function will create the correct history depending on who the dealer is
// inserting as many "invisible" blocks as needed
function createHistory(history: Array<Bid>): Array<Bid> {
  const dealer = biddingProblem.dealer;
  if (dealer === "W") {
    return [new Bid(0, 0, "", false), history].flat();
  }
  if (dealer === "N") {
    return [new Bid(0, 0, "", false), new Bid(0, 0, "", false), history].flat();
  }
  if (dealer === "E") {
    return [
      new Bid(0, 0, "", false),
      new Bid(0, 0, "", false),
      new Bid(0, 0, "", false),
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

// Checks if solution is correct
// emited from bidding-problem
function check() {
  // Here we ask the backend if {suit, rank} is correct, and then we
  // get a response if it was correct and data needed for that situation
  // Will be simulated with a function returning a random response
  //axios.post(`/prefix/bidding-problem/${route.params.id}`, { bid: bid.getShortName }) ->
  const response =
    bidResponseList[Math.floor(Math.random() * bidResponseList.length)];
  if (!response.correct) {
    // What happens if wrong bid was made
    biddingExplanation.value = response.explanation;
    isBidMade.value = true;
  }
  if (response.correct && !response.finished) {
    // What happens if correct bid was made, but not finished
    presentationText.value = response.explanation;
    biddingHistory.value = createHistory(Bid.fromJson(response.bidding));
  }
  if (response.finished) {
    // What happens if correct bid was made and finished
    pass.value = true;
    solution.value = response.solution;
    nextProblemId.value = response.next_problem_id;
    biddingHistory.value = createHistory(Bid.fromJson(response.bidding));
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
        :handsVisable="biddingProblem.hands_visible"
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
            @click="pass = true"
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
        :handsVisable="biddingProblem.hands_visible"
        :biddingAnswer="solution"
        :nextProblemId="nextProblemId"
      ></game-analysis-main>
    </div>
  </div>
</template>
