import Stripe from "stripe";
import Subscription from "../models/subscription";

export default async function handleSubUpdated(event: Stripe.Event) {
  const sub = Subscription.of(event.data.object as Stripe.Subscription);
  const user = await sub.getUser();
  await user.save({
    plan: (sub.isActive() ? sub.name : undefined) ?? undefined,
    plan_status: sub.status ?? undefined,
  }, { useMasterKey: true })
}
