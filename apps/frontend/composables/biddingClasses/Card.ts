enum SUIT {
  CLUBS = 0,
  DIAMONDS = 1,
  HEARTS = 2,
  SPADES = 3,
}

export class Card {
  public suit: number;
  public rank: number;

  static ranksToNumber = new Map([
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
    ["T", 10],
    ["J", 11],
    ["Q", 12],
    ["K", 13],
    ["A", 14],
  ]);

  static ranksToString = new Map([
    [1, "1"],
    [2, "2"],
    [3, "3"],
    [4, "4"],
    [5, "5"],
    [6, "6"],
    [7, "7"],
    [8, "8"],
    [9, "9"],
    [10, "T"],
    [11, "J"],
    [12, "Q"],
    [13, "K"],
    [14, "A"],
  ]);

  static suitsToNumber = new Map([
    ["C", SUIT.CLUBS],
    ["D", SUIT.DIAMONDS],
    ["H", SUIT.HEARTS],
    ["S", SUIT.SPADES],
  ]);

  static toTailwindIcon = new Map([
    [SUIT.CLUBS, "i-fluent-emoji-high-contrast-club-suit !text-clubs"],
    [SUIT.DIAMONDS, "i-fluent-emoji-high-contrast-diamond-suit !text-diamonds"],
    [SUIT.HEARTS, "i-fluent-emoji-high-contrast-heart-suit !text-hearts"],
    [SUIT.SPADES, "i-fluent-emoji-high-contrast-spade-suit !text-spades"],
  ]);

  // example: rank = "A", suit = "S" => suit = 3, rank = 14
  public constructor(rank: string, suit: string) {
    this.rank = Card.ranksToNumber.get(rank) as number;
    this.suit = Card.suitsToNumber.get(suit) as number;
  }

  public toString(): string {
    return `${Card.ranksToString.get(this.rank)}`;
  }
}
