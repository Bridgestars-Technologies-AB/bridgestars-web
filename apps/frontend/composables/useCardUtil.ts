namespace CardUtil {
  // Define the values for each card
  //example of a card: {suit: 0, rank: 1} = Ace of Clubs

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

  // Enum for which number corresponds to which suit
  export enum Suit {
    clubs = 0,
    diamonds = 1,
    hearts = 2,
    spades = 3,
    NT = 4,
  }

  // A list of tailwind util classes for each suit in the same order as Suit enum
  // i.e symbols[Suits.club] = "i-fluent-emoji-high-contrast-club-suit !text-clubs"
  // OBS: The order should be the same as the Suit enum
  export const symbols = [
    "i-fluent-emoji-high-contrast-club-suit !text-clubs",
    "i-fluent-emoji-high-contrast-diamond-suit !text-diamonds",
    "i-fluent-emoji-high-contrast-heart-suit !text-hearts",
    "i-fluent-emoji-high-contrast-spade-suit !text-spades",
  ];

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
