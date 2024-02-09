import "parse/node";
import DbObject, * as Requests from "./__DbObject__";
import { field, immutable, required, z } from "../utils/validate";
import { deleteRole, hasRoleBool } from "utils/roles";
import fail, { CODE } from "utils/fail";
import { masterOnly } from "../utils/validate";
import { Field, Reaction, Status } from "../enums/Message";
import { Class } from "enums/Classes";

class Message extends DbObject {
  static instance = new Message();

  private constructor() {
    super({
      className: Class.Message,
      fields: {
        [Field.Sender]: { type: "Pointer", targetClass: Class.User },
        [Field.Chat]: { type: "Pointer", targetClass: Class.Chat },
        [Field.Text]: { type: "String" },
        [Field.Status]: { type: "Number" },
        [Field.ReactionSummary]: { type: "Object" },
        [Field.Reactions]: { type: "Relation", targetClass: Class.Reaction },
      },
      indexes: {},
      classLevelPermissions: {
        find: { requiresAuthentication: true },
        count: { "role:Admin": true },
        get: { requiresAuthentication: true },
        update: { requiresAuthentication: true },
        create: { requiresAuthentication: true },
        delete: { "role:Admin": true },
        protectedFields: {
          "*": [],
        },
      },
    });
  }

  async validate(
    req: Requests.BeforeSaveRequest,
    obj: Parse.Object,
  ): Promise<void> {
    field(req, Field.Text, z.string().trim().max(2000).min(1).optional());
    field(
      req,
      Field.Status,
      z.number().int().min(Status.Draft).max(Status.Read).optional(),
    );

    field(
      req,
      Field.ReactionSummary,
      z.object({
        [Reaction.Upvote]: z.number().int().positive().max(99999),
        [Reaction.Downvote]: z.number().int().positive().max(99999),
      }),
    );

    immutable(req, Field.Sender);
    immutable(req, Field.Chat);
    immutable(req, Field.Text);
    masterOnly(req, Field.ReactionSummary);
  }

  async beforeSave(
    req: Requests.BeforeSaveRequest,
    obj: Parse.Object,
  ): Promise<void> {
    if (obj.isNew()) {
      const chat = obj.get(Field.Chat);
      if (!await hasRoleBool("chat-" + chat.id, req.user)) {
        fail("Chatten kunde inte hittas", CODE.ObjectNotFound);
      }
      //create
      obj.set(Field.Sender, req.user);
      obj.set(Field.Status, Status.Sent);
      obj.set(Field.ReactionSummary, {});
      const acl = new Parse.ACL();
      acl.setRoleReadAccess("chat-" + chat.id, true);
      acl.setRoleWriteAccess("chat-" + chat.id, true);
      obj.setACL(acl);
    } else {
      // update
    }
  }

  async afterSave(
    req: Requests.AfterSaveRequest,
    chat: Parse.Object,
  ): Promise<void> {
    if (!req.original) {
    }
  }

  async beforeDelete(
    req: Requests.BeforeDeleteRequest,
    obj: Parse.Object,
  ): Promise<void> { }

  async afterDelete(
    req: Requests.AfterDeleteRequest,
    obj: Parse.Object,
  ): Promise<void> {
    const reactions = await obj.relation(Field.Reactions)
    .query()
    .findAll({
      useMasterKey: true,
    });

    await Parse.Object.destroyAll(reactions, { useMasterKey: true });
  }
}

export default Message.instance;
