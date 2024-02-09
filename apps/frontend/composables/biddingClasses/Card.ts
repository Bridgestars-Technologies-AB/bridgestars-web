enum SUIT {
  CLUBS = 0,
  DIAMONDS = 1,
  HEARTS = 2,
  SPADES = 3,
}

export class Card {
  // parsa, displaya i handen
  public suit: number;
  public rank: number;

  private ranks = new Map([
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

  private suits = new Map([
    ["C", SUIT.CLUBS],
    ["D", SUIT.DIAMONDS],
    ["H", SUIT.HEARTS],
    ["S", SUIT.SPADES],
  ]);

  // example: rank = "A", suit = "S" => suit = 3, rank = 14
  public constructor(rank: string, suit: string) {
    this.rank = this.ranks.get(rank) as number;
    this.suit = this.suits.get(suit) as number;
  }
}
