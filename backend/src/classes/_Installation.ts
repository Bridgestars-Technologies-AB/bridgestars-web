import DbObject, {
  AfterDeleteRequest,
  AfterSaveRequest,
  BeforeDeleteRequest,
  BeforeSaveRequest,
} from "./__DbObject__";

class Installation extends DbObject {
  static instance = new Installation();
  constructor() {
    super({
      className: "_Installation",
      fields: {
        // only defaults
      },
      indexes: {},
      classLevelPermissions: {
        protectedFields: { // only owner can read these fields
        },
      },
    });
  }

  validate(_req: BeforeSaveRequest, obj: Parse.Object): void | Promise<void> { }
  beforeSave(_req: BeforeSaveRequest, obj: Parse.Object): void | Promise<void> { }
  afterSave(_req: AfterSaveRequest, obj: Parse.Object): void | Promise<void> { }
  beforeDelete(_req: BeforeDeleteRequest, obj: Parse.Object): void | Promise<void> { }
  afterDelete(_req: AfterDeleteRequest, obj: Parse.Object): void | Promise<void> { }
}
export default Installation.instance;
