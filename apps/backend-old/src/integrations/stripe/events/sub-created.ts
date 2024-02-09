import Stripe from "stripe";
import Subscription from "../models/subscription";

export default async function handleSubCreated(event: Stripe.Event) {
  const sub = Subscription.of(event.data.object as Stripe.Subscription);
  const user = await sub.getUser();

  await user.save({ plan: sub.name, plan_status: sub.status }, {
    useMasterKey: true,
  });
}
