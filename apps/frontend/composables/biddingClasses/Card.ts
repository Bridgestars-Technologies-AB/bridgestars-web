export class Card {
  public suit: number;
  public rank: number;
  public constructor(suit: number, rank: number) {
    this.suit = suit;
    this.rank = rank;
  }

  public is(str: string): boolean {
    switch (str) {
      case "PASS":
        return this.suit === 0 && this.rank === 0;
      case "NT":
        return this.suit === 4;
      case "DOUBLE":
        //check if the bid is a double
        return false;
      case "REDOUBLE":
        //check if the bid is a redouble
        return false;
      default:
        return false;
    }
  }

  public getShortName(): string {
    if (this.rank === 0 && this.suit === 0) {
      return "PASS";
    }
    if (this.suit === 4) {
      return this.rank + "NT";
    }
    return "";
  }
  public tailwindSuitSymbol(): string {
    switch (this.suit) {
      case 1:
        return "i-fluent-emoji-high-contrast-club-suit !text-clubs";
      case 2:
        return "i-fluent-emoji-high-contrast-diamond-suit !text-diamonds";
      case 3:
        return "i-fluent-emoji-high-contrast-heart-suit !text-hearts";
      case 4:
        return "i-fluent-emoji-high-contrast-spade-suit !text-spades";
      default:
        return "";
    }
  }
}
