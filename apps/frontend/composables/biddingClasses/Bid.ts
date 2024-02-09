import { t } from "i18next";

export class Bid {
  public suit: number;
  public rank: number;
  public shortName: string;
  //public explanation: string;

  public constructor(suit: number, rank: number) {
    this.suit = suit;
    this.rank = rank;
    this.shortName = this.getShortName();
  }

  public is(str: string): boolean {
    switch (str) {
      case "PASS":
        return this.rank === 0 && this.suit === 0;
      case "NT":
        return this.suit === 4;
      case "DOUBLE":
        //check if the bid is a double
        return false;
      case "REDOUBLE":
        //check if the bid is a redouble
        return false;
      case "SUIT":
        return this.suit !== 4 && this.rank > 0;
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
    } else {
      return this.rank.toString();
    }
  }

  public tailwindSuitSymbol(): string {
    switch (this.suit) {
      case 0:
        return "i-fluent-emoji-high-contrast-club-suit !text-clubs";
      case 1:
        return "i-fluent-emoji-high-contrast-diamond-suit !text-diamonds";
      case 2:
        return "i-fluent-emoji-high-contrast-heart-suit !text-hearts";
      case 3:
        return "i-fluent-emoji-high-contrast-spade-suit !text-spades";
      default:
        return "";
    }
  }
}
