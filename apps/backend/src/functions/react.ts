import { Reaction } from "enums/Message";
import { CODE } from "utils/errorcode";
import fail from "utils/fail";
import { hasRoleAsync } from "utils/roles";
import { z } from "utils/validate";

// params:
//
// target: Parse.Object | {objectId, className}
// reaction: Reaction
Parse.Cloud.define("react", async (req) => {
  if (!req.user) fail("Åtkomst nekad. Inloggning krävs.", CODE.Unauthorized);

  z.object({
    target: z.object({
      objectId: z.string(),
      className: z.string(),
    }),
    reaction: z.nativeEnum(Reaction),
  }).parse(req.params);

  const target = req.params.target;
  const reaction = req.params.reaction;
  const role = target.className + "-" + target.objectId;

  hasRoleAsync(role, req.user)


  if (!Object.keys(Reaction).includes(reaction)) {
    fail("Ogiltig reaktion.", CODE.InvalidClassName);
  }
});
