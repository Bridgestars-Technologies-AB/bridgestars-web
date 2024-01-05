import { removeAllAssociatedSessions } from "../utils/roles";
import { field, immutable, masterOnly, z } from "../utils/validate";
import { Mailer } from "../utils/mailer";

import "parse/node";
import DbObject, * as Requests from "./__DbObject__";
import UserInfo from "../utils/userinfo";






class User extends DbObject {
  static instance = new User();

  private constructor() {
    super({
      className: "_User",
      fields: {
        // username, password, email etc. are default fields
        dispName: { type: "String" },
        img: { type: "File" },
        plan: { type: "String" },

        // private
        lang: { type: "String" },
        plan_status: { type: "String" },
      },
      indexes: { },
      classLevelPermissions: {
        find: { requiresAuthentication: true },
        count: { "role:Admin": true },
        get: { requiresAuthentication: true },
        update: { requiresAuthentication: true },
        create: { "*": true },
        delete: { "role:Admin": true },
        protectedFields: { // only owner can read these fields
          "*": ["lang", "plan_status"],
        },
      },
    });
  }

  validate(req: Requests.BeforeSaveRequest, obj: Parse.Object): void {
    immutable(req, "email"); //update email not implemented yet

    field(
      req,
      "password",
      z.string()
        .max(100)
        .min(8, { message: "Lösenordet måste vara minst 8 tecken långt" })
        .regex(/[0-9]/, {
          message: "Lösenordet måste innehålla minst en siffra",
        })
        .regex(/[a-z]/, {
          message: "Lösenordet måste innehålla minst en liten bokstav",
        })
        .regex(/[A-Z]/, {
          message: "Lösenordet måste innehålla minst en stor bokstav",
        }),
    );

    field(
      req,
      "email",
      z.string().email({ message: "Mailadressen verkar inte vara giltig" })
        .trim().toLowerCase(),
    );

    field(req, "lang", z.string().length(2).trim().optional());

    if (req.object.dirty("dispName") && !req.object.isNew()) {
      req.object.set("username", req.object.get("dispName").trim());
    } else if (req.object.dirty("username")) {
      req.object.set("dispName", req.object.get("username").trim());
    }

    field(
      req,
      "username",
      z.string().trim().toLowerCase()
        .min(3, { message: "Användarnamnet måste vara minst 3 tecken långt" })
        .max(15, { message: "Användarnamnet får vara max 15 tecken långt" })
        .regex(/^[a-zåäö].*/, {
          message: "Användarnamnet måste börja med en bokstav",
        }),
    );
    
    field(req, "plan", z.string().toLowerCase().optional());
    field(req, "plan_status", z.string().toLowerCase().optional());
    masterOnly(req, "plan");
    masterOnly(req, "plan_status");
  }

  async beforeSave(req: Requests.BeforeSaveRequest, obj: Parse.Object): Promise<void> {
    if (req.object.isNew()) {
      const acl = new Parse.ACL();
      // acl.setRoleReadAccess("admin", true); // hmm ta bort?
      // acl.setRoleWriteAccess("admin", true);
      acl.setPublicReadAccess(true);
      acl.setPublicWriteAccess(false);
      req.object.setACL(acl);
    }
  }

  async afterSave(req: Requests.AfterSaveRequest, obj: Parse.Object): Promise<void> {
    if (! req.original) {
      if (req.installationId) {
        // installationhandler.createinstallation
      }
      await UserInfo.create(obj as Parse.User);
      await Mailer.sendWelcomeEmail(obj as Parse.User);
    } else {
      // remove old profile img
      if (req.original.get("img")?.url() !== obj.get("img")?.url()) {
        await req.original.get("img").destroy({ useMasterKey: true });
      }
    }
  }

  beforeDelete(req: Requests.BeforeDeleteRequest, obj: Parse.Object): void | Promise<void> {
  }

  async afterDelete(req: Requests.AfterDeleteRequest, obj: Parse.Object): Promise<void> {
    console.log("\n\n\n USER DELETED\n\n")
    await obj.get("img")?.destroy({ useMasterKey: true });
    await removeAllAssociatedSessions(req.object as Parse.User);
    await UserInfo.delete(obj as Parse.User);
  }
}

export default User.instance;


