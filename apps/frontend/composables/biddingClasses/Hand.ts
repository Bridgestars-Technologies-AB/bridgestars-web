import { Card } from "./Card";

//
// hand: {
//       player: "N",
//       spades: "D876",
//       hearts: "AT4",
//       diamonds: "KJ3",
//       clubs: "KJ3",
//     },

interface BidResponse {
  player: string;
  spades: string;
  hearts: string;
  diamonds: string;
  clubs: string;
}
export class Hand {
  public player: string;
  public cards: Array<Card>;
  public spades: Array<Card>;
  public hearts: Array<Card>;
  public diamonds: Array<Card>;
  public clubs: Array<Card>;

  public constructor(response: BidResponse) {
    this.player = response.player;
    this.spades = this.mapCards(response.spades.split(""), "S");
    this.hearts = this.mapCards(response.hearts.split(""), "H");
    this.diamonds = this.mapCards(response.diamonds.split(""), "D");
    this.clubs = this.mapCards(response.clubs.split(""), "C");
    this.cards = [this.spades, this.hearts, this.diamonds, this.clubs].flat();
  }

  mapCards(cards: string[], suit: string): Card[] {
    return cards.map((card) => new Card(card, suit));
  }

  //   public getSuitedCards(suit: string): Array<Card> {
  //     // Here we will return the cards of the given suit
  //   }
}
