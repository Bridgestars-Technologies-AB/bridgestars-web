import Customer from "./customer";
import stripe from "../config";
import { Plan } from "../prices";
import fail, { CODE } from "../../../utils/fail";

function validateURL(url: string) {
  if (
    url.startsWith("http://localhost") || url.startsWith("https://localhost") ||
    url.startsWith("https://budträning.se")
  ) {
    return;
  } else {
    fail("Ogiltig URL-address för vidarebefordring.", CODE.InternalError, {
      meta: "Endast budträning.se eller localhost är tillåtet.",
    });
  }
}

export class Portal {
  constructor(readonly user: Parse.User) { }

  async subscribe(
    plan: Plan,
    success_url: string,
    cancel_url: string,
  ): Promise<String> {
    validateURL(success_url);
    validateURL(cancel_url);
    const customer = await Customer.create(this.user);
    console.log("customer", customer);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: plan.priceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      customer: customer,
      metadata: { userId: this.user.id },
      locale: "auto",
      custom_text: {
        // Adds message above the "Start trial" button
        // submit: {message: 'Subscribe to ' + metadata.courseId},
      },
      subscription_data: {
        // description: 'Subscription to ' + metadata.courseId,
        metadata: {
          userId: this.user.id,
          name: plan.name,
        },
        trial_period_days: 7,
      },
      expires_at: Math.round(Date.now() / 1000) + 3600 * 2, // two hours from now
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url: encodeURI(
        success_url + (success_url.includes("?") ? "&" : "?") +
        "session_id={CHECKOUT_SESSION_ID}",
      ),
      cancel_url: encodeURI(cancel_url),
    });
    return session.url;
  }

  async manage(return_url: string): Promise<String> {
    validateURL(return_url);
    const cus_id = await Customer.getId(this.user);

    const session = await stripe.billingPortal.sessions.create({
      customer: cus_id,
      return_url: return_url,
    });
    return session.url;
  }
}
