
import { Portal } from "../integrations/stripe/models/portal";
import fail, { CODE } from "../utils/fail";

Parse.Cloud.define("manage-plan", async (req) => {
  if (!req.user) fail("Åtkomst nekad. Inloggning krävs.", CODE.Unauthorized);
  if (!req.params.return_url) {
    fail("Ingen URL för vidarebefordring angiven.", CODE.MissingArgument, {meta: "Missing return_url."});
  }
  return new Portal(req.user).manage(req.params.return_url);
});
