import "parse/node";
import DbObject, * as Requests from "./__DbObject__";
import Chapter from "./Chapter";

class Progress extends DbObject {
  static instance = new Progress();

  private constructor() {
    super({
      className: "Progress",
      fields: {
        user: { type: "String" }, // id
        chapter: { type: "Pointer", targetClass:Chapter.className }, // id of chap/course
        progress: { type: "Number" },
        // data?
        // createdAt already exists
      },
      indexes: {},
      classLevelPermissions: {
        find: { requiresAuthentication: true }, //depends on if next fetches via server or not
        count: { "role:Admin": true },
        get: { requiresAuthentication: true },
        update: { requiresAuthentication: true },
        create: { requiresAuthentication: true },
        delete: { requiresAuthentication: true },
        protectedFields: {
          "*": [],
        },
      },
    });
  }

  validate(req: Requests.BeforeSaveRequest, obj: Parse.Object): void { }

  async beforeSave(req: Requests.BeforeSaveRequest, obj: Parse.Object): Promise<void> {
    if (req.object.isNew()) {
    }
  }
  afterSave(req: Requests.AfterSaveRequest, obj: Parse.Object): void | Promise<void> { }
  beforeDelete(req: Requests.BeforeDeleteRequest, obj: Parse.Object): void | Promise<void> { }
  afterDelete(req: Requests.AfterDeleteRequest, obj: Parse.Object): void | Promise<void> { }
}

export default Progress.instance;
