namespace CardUtil {
  export const symbols = [
    { symbol: "♣", color: "!text-clubs" },
    { symbol: "♦", color: "!text-diamonds" },
    { symbol: "♥", color: "!text-hearts" },
    { symbol: "♠", color: "!text-spades" },
    { symbol: "NT", color: "!text-white" },
  ];

  // Define the values for each card
  export const cardValues = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

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
}

export { CardUtil };
