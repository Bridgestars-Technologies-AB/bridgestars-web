class Hand {
  public player: string;
  public cards: string[] = [];

  static fromPBN(pbn: string): Hand {
    return new Hand();
  }

  public constructor() {
    this.player = "N";
  }
}
