import "parse/node";
import DbObject, * as Requests from "./__DbObject__";
import User from "./_User"

class UserInfo extends DbObject {
  static instance = new UserInfo();

  private constructor() {
    super({
      className: "UserInfo",
      fields: {
        user: { type: "Pointer", targetClass: User.className },
        emails_sent: { type: "Array" },
        migrated: { type: "Boolean" },
        last_login: { type: "Date" },
        stripe_cus_id: { type: "String" },
      },
      indexes: {},
      classLevelPermissions: {
        find: { "role:Admin": true },
        count: { "role:Admin": true },
        get: { "role:Admin": true },
        update: { "role:Admin": true },
        create: { "role:Admin": true },
        delete: { "role:Admin": true },
        protectedFields: {
          "*": [],
        },
      },
    });
  }

  validate(req: Requests.BeforeSaveRequest, obj: Parse.Object): void {

  }

  async beforeSave(req: Requests.BeforeSaveRequest, obj: Parse.Object): Promise<void> {
    if (req.object.isNew()) {

    }
  }
  afterSave(req: Requests.AfterSaveRequest, obj: Parse.Object): void | Promise<void> {

  }
  beforeDelete(req: Requests.BeforeDeleteRequest, obj: Parse.Object): void | Promise<void> {

  }
  afterDelete(req: Requests.AfterDeleteRequest, obj: Parse.Object): void | Promise<void> {

  }
}

export default UserInfo.instance;
