
export enum Status {
  Draft = 0,
  Sent = 1,
  Delivered = 2,
  Read = 3,
}

export enum Reaction {
  Upvote,
  Downvote,
}

export enum Field {
  Sender = "sender",
  Chat = "chat",
  Text = "text",
  Status = "status",
  Reactions = "reacts",
  ReactionSummary = "summary",
}
