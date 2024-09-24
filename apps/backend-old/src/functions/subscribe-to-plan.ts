import { Portal } from "../integrations/stripe/models/portal";
import { PLANS } from "../integrations/stripe/prices";
import fail, { CODE } from "../utils/fail";

Parse.Cloud.define("subscribe-to-plan", async (req) => {
  if (!req.user) fail("Åtkomst nekad. Inloggning krävs.", CODE.Unauthorized);
  if (!req.params.plan) {
    fail("Ingen prenumerationsplan angiven", CODE.MissingArgument);
  }
  if (!req.params.success_url) {
    fail("Ingen URL för vidarebefordring angiven.", CODE.MissingArgument, {
      meta: "Missing success_url.",
    });
  }
  if (!req.params.cancel_url) {
    fail("Ingen URL för vidarebefordring angiven.", CODE.MissingArgument, {
      meta: "Missing cancel_url.",
    });
  }
  return new Portal(req.user).subscribe(
    PLANS[req.params.plan],
    req.params.success_url,
    req.params.cancel_url,
  );
});
