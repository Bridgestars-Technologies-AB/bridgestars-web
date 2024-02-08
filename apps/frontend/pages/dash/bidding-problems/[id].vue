<script setup>
const route = useRoute();
console.log(route.params.id);

//axios.get(`/prefix/bidding-problem/${id}`) -> response.data
// Mock up response data:
const response = {
  number: 1, // problem 1 out of 10 in this chapter (deal_nbr)
  total: 10,
  presentation:
    "Vad bjuder du som svarshand när din partner har öppnat med 1 NT?",
  hands_visible: 1, // [1,2,4] bara min, mitt lag eller alla
  cards: [
    {
      spades: "D876",
      hearts: "AT4",
      diamonds: "KJ3",
      clubs: "KJ3",
    },
  ],
  dealer: "N", // North starts the auction
  player: "E", // Vem spelar vi som??
  bidding: [
    { bid: "1NT", explanation: " 0 - 8 hp" },
    { bid: "PASS" },
    { bid: "3NT", explanation: " 10 - 15 hp" },
  ],
};

//Mock up response from server when playing a bid ....
const bidResponseList = [
  {
    correct: false,
    finished: false,
    bid: "2NT",
    explanation: "Det var inte riktigt rätt",
  },
  // {
  //   // vänta med denna, mer komplexitet
  //   correct: true,
  //   finished: false,
  //   bid: "2NT",
  //   explanation: "Du spelade 2NT, det visar hmm hmm hmm",
  //   bidding: [
  //     { bid: "3NT", explanation: " 0 - 8 hp, nord visar styrka" },
  //     { bid: "PASS" },
  //     { bid: "PASS" },
  //   ],
  // },
  {
    correct: true,
    finished: true,
    next_problem_id: "sjNDASL283aD",
    cards: {
      west: { spades: "D876", hearts: "AT4", diamonds: "KJ3", clubs: "KJ3" },
      north: { spades: "D876", hearts: "AT4", diamonds: "KJ3", clubs: "KJ3" },
      east: { spades: "D876", hearts: "AT4", diamonds: "KJ3", clubs: "KJ3" },
      south: { spades: "D876", hearts: "AT4", diamonds: "KJ3", clubs: "KJ3" },
    },
    solution: "Given blablabla",
    bidding: [
      // all budgivnings historik för givet
    ],
  },
];

//Mock data, will be fetched from DB table bidding-problems and bidding-result
const solution = {
  suit: 4,
  rank: 2,
};

const history = [
  { suit: 10, rank: 10 },
  { suit: 4, rank: 1 },
  { suit: 0, rank: 0 },
];

// used as v-model to be able to see the latest bid made
const suit = ref(0);
const rank = ref(0);
const deal = ref(1);

// history of bids made
const biddingHistory = ref(history);

const textOutput = ref(response.presentation);
const pass = ref(false);

// Checks if solution is correct
// emited from bidding-problem
function check() {
  // Here we ask the backend if {suit, rank} is correct, and then we
  // get a response if it was correct and data needed for that situation
  // Will be simulated with a function returning a random response
  //axios.post(`/prefix/bidding-problem/${route.params.id}`, { bid: "2NT" }) ->
  const response =
    bidResponseList[Math.floor(Math.random() * bidResponseList.length)];
  if (!response.correct) {
    // What happens if wrong bid was made
    textOutput.value = response.explanation;
  }
  if (response.correct) {
    // What happens if correct bid was made, but not finished
  }
  if (response.finished) {
    // What happens if correct bid was made and finished
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
          >Giv {{ deal }} av 10</span
        >
      </div>
      <game-bidding-problem
        v-model:suit="suit"
        v-model:rank="rank"
        :presentationText="textOutput"
        :history="history"
        @check="check"
      ></game-bidding-problem>
    </div>
    <div v-else class="w-full h-full flex justify-center items-center">
      <game-analysis-main
        :biddingResult="biddingHistory"
        :solution="solution"
        :biddingAnswer="biddingAnswer"
      ></game-analysis-main>
    </div>
  </div>
</template>
