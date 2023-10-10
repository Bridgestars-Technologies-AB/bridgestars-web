export const symbols = [
  { symbol: "♣", color: "!text-clubs" },
  { symbol: "♦", color: "!text-diamonds" },
  { symbol: "♥", color: "!text-hearts" },
  { symbol: "♠", color: "!text-spades" },
  { symbol: "NT", color: "!text-white" },
];

export const suits = ["♣", "♦", "♥", "♠"];

export enum Suit {
  clubs = 0,
  diamond = 1,
  hearts = 2,
  spades = 3,
  NT = 4,
}

//Not able to use as type, Card not defined??
export interface Card {
  suit: number;
  rank: number;
}

// When we print the ranks, we do not want rank 2-14, we want T, J, Q, K, A as well
export const printedRanks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];
