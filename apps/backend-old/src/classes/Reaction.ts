import "parse/node";
import DbObject, * as Requests from "./__DbObject__";
import { field, immutable, required, z } from "../utils/validate";
import { deleteRole, hasRoleBool } from "utils/roles";
import fail, { CODE } from "utils/fail";
import { masterOnly } from "../utils/validate";

import {
  Field as Message,
  Reaction as ReactionType,
  Status,
} from "../enums/Message";

import { Field } from "../enums/Reaction";
import { Class } from "../enums/Classes";

class Reaction extends DbObject {
  static instance = new Reaction();

  private constructor() {
    super({
      className: Class.Reaction,
      fields: {
        [Field.Sender]: { type: "Pointer", targetClass: Class.User },
        [Field.Reaction]: { type: "Number" },
      },
      indexes: {},
      classLevelPermissions: {
        find: { requiresAuthentication: true },
        count: { "role:Admin": true },
        get: { requiresAuthentication: true },
        update: { requiresAuthentication: true },
        create: { "role:Admin": true },
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
    field(req, Field.Reaction, z.nativeEnum(ReactionType));
    immutable(req, Field.Sender);
  }

  async beforeSave(
    req: Requests.BeforeSaveRequest,
    obj: Parse.Object,
  ): Promise<void> {
    if (obj.isNew()) {

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
  }
}

export default Reaction.instance;
