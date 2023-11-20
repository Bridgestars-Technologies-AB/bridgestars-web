import Stripe from "stripe";

export enum SubStatus {
  INCOMPLETE = "incomplete",
  INCOMPLETE_EXPIRED = "incomplete_expired",
  TRIALING = "trialing",
  ACTIVE = "active",
  PAST_DUE = "past_due",
  CANCELED = "canceled",
  UNPAID = "unpaid",
}

export default class Subscription {
  readonly status: SubStatus;
  readonly name: string;
  readonly userId: string;

  static of(sub: Stripe.Subscription) {
    return new Subscription(sub);
  }
  private constructor(readonly sub: Stripe.Subscription) {
    this.name = sub.metadata.name;
    this.userId = sub.metadata.userId;
    this.status = sub.status as SubStatus;
  }

  async getUser() {
    return await new Parse.Query("_User").get(this.userId, {
      useMasterKey: true,
    });
  }
  async isActive() {
    return ["active", "trialing", "past_due"].includes(this.sub.status);
  }
}
