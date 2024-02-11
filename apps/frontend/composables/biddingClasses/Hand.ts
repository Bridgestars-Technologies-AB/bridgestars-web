import { Card } from "./Card";
import type { HandData } from "~/types/generated";

export class Hand {
  public player: string;
  public cards: Array<Card>;
  public spades: Array<Card>;
  public hearts: Array<Card>;
  public diamonds: Array<Card>;
  public clubs: Array<Card>;

  // constructor to create the hand from the response
  public constructor({ player, S, H, D, C }: HandData) {
    this.player = player;
    this.spades = this.mapCards(S.split(""), "S");
    this.hearts = this.mapCards(H.split(""), "H");
    this.diamonds = this.mapCards(D.split(""), "D");
    this.clubs = this.mapCards(C.split(""), "C");
    this.cards = [this.spades, this.hearts, this.diamonds, this.clubs].flat();
  }

  // help method to construct the cards
  mapCards(cards: string[], suit: string): Card[] {
    return cards.map((card) => new Card(card, suit));
  }

  // if suit is omitted, return all cards as string
  public toString(suit: string = "") {
    switch (suit) {
      case "spades":
        return this.spades.map((card) => card.toString()).join("");
      case "hearts":
        return this.hearts.map((card) => card.toString()).join("");
      case "diamonds":
        return this.diamonds.map((card) => card.toString()).join("");
      case "clubs":
        return this.clubs.map((card) => card.toString()).join("");
      default:
        return this.cards.map((card) => card.toString()).join("");
    }
  }
}
