class Bid {
  public suit: number;
  public rank: number;
  public shortName: string;
  //public explanation: string;

  public constructor(suit: number, rank: number) {
    this.shortName = toShortName(suit, rank);
  }
}
