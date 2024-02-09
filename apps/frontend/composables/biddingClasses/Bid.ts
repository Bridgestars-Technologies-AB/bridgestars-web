import { t } from "i18next";

// This interface is used to represent a bid sent from the server
interface bidResponse {
  bid: string;
  explanation: string;
}

export class Bid {
  public suit: number;
  public rank: number;
  public shortName: string;
  public explanation: string;

  public constructor(suit: number, rank: number, explanation = "") {
    this.suit = suit;
    this.rank = rank;
    this.shortName = this.getShortName();
    this.explanation = explanation;
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

  // This function is used to convert a bidding sequence from the server to a list of Bid objects
  public static fromJson(bidding: Array<bidResponse>): Array<Bid> {
    return bidding.map((b) => this.fromString(b.bid, b.explanation));
  }

  // This function creates a Bid object from a string representation of a bid
  public static fromString(bid: string, explanation: string): Bid {
    let suit = 0;
    let rank = 0;
    if (bid === "PASS") {
      suit = 0;
      rank = 0;
    }
    if (bid.includes("NT")) {
      const temp = bid.split("NT");
      suit = 4;
      rank = parseInt(temp[0]);
    }
    // not decided yet how to represent suit, so this is a placeholder
    if (bid.includes("....")) {
      const temp = bid.split("....");
      //suit = ?;
      rank = parseInt(temp[0]);
    }
    return new Bid(suit, rank, explanation);
  }
}
