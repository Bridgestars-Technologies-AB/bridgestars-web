import "parse/node";
import DbObject, * as Requests from "./__DbObject__";
import { field, immutable, required, z } from "../utils/validate";
import { createAndSaveSlug, updateSlug } from "../utils/slug";
import fail, { CODE } from "utils/fail";
import { addRoleAsync, createObjRole, createRole, getObjRoleName } from "utils/roles";
import { deleteRole } from "utils/roles";

class Chat extends DbObject {
  static instance = new Chat();

  private constructor() {
    super({
      className: "Chat",
      fields: {
        name: { type: "String" },
        users: { type: "Relation", targetClass: "_User" },
        pm: { type: "Boolean" },
        //public: { type: "Boolean" },
        //parent: { type: "Pointer", targetClass: "Post" },
      },
      indexes: {},
      classLevelPermissions: {
        find: { requiresAuthentication: true }, //depends on if next fetches via server or not
        count: { "role:Admin": true },
        get: { requiresAuthentication: true },
        update: { "role:Admin": true },
        create: { requiresAuthentication: true },
        delete: { "role:Admin": true },
        protectedFields: {
          "*": [],
        },
      },
    });
  }

  validate(req: Requests.BeforeSaveRequest, obj: Parse.Object): void {
    field(req, "name", z.string().max(50).optional());
  }

  async beforeSave(
    req: Requests.BeforeSaveRequest,
    obj: Parse.Object,
  ): Promise<void> {
    if (obj.isNew()) {
    } else {
    }
  }

  async afterSave(
    req: Requests.AfterSaveRequest,
    chat: Parse.Object,
  ): Promise<void> {
    if (!req.original) {
      // create role and add users
      const roleName = getObjRoleName(chat);
      const role = createRole(roleName);
      const users = await chat.relation("users").query().findAll({useMasterKey: true});
      role.relation("users").add(users);
      role.save(null, {useMasterKey: true});

      // add role to chat read access
      const acl = new Parse.ACL();
      acl.setRoleReadAccess(, true);
      chat.setACL(acl);
      chat.save(null, { useMasterKey: true, context: { noValidation: true } });
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
    await deleteRole("Chat-" + obj.id);
  }
}

export default Chat.instance;

