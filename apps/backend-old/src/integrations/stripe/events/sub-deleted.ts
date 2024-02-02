import Stripe from "stripe";
import Subscription from "../models/subscription";

export default async function handleSubDeleted(event: Stripe.Event) {
  const sub = Subscription.of(event.data.object as Stripe.Subscription);
  const user = await sub.getUser();
  user.unset("plan");
  user.unset("plan_status");
  await user.save(null, { useMasterKey: true });
}
