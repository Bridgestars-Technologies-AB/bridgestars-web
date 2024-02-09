import "parse/node";
import DbObject, * as Requests from "./__DbObject__";
import Problem from "./Problem";
import User from "./_User";
import { required, z, field, immutable } from "../utils/validate";
import fail, { CODE } from "../utils/fail";

class Answer extends DbObject {
  static instance = new Answer();

  private constructor() {
    super({
      className: "Answer",
      fields: {
        user: { type: "Pointer", targetClass: User.className },
        prob: { type: "Pointer", targetClass: Problem.className }, 
        sol: { type: "Array" },
      },
      indexes: { },
      classLevelPermissions: {
        find: { requiresAuthentication: true }, 
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

  validate(req: Requests.BeforeSaveRequest, obj: Parse.Object): void { 
    required(req, "user")
    required(req, "prob")
    required(req, "sol")
    immutable(req, "user")
    immutable(req, "prob")
    field(req, "sol", z.array(z.number().safe().positive().int()))
  }

  async beforeSave(req: Requests.BeforeSaveRequest, obj: Parse.Object): Promise<void> {
    if (obj.isNew()) {
      //check if user has access to the problem by having the right course role
      const prob = await obj.get("prob").fetch({useMasterKey: true})
      const chapter = await prob.get("chapter").fetch({useMasterKey: true})
      const course = await chapter.get("course").fetch({useMasterKey: true})
      // will fail if user is not in course, error message is handled by custom handler
      await course.relation("users").query().equalTo("objectId", req.user.id).get()

    }
  }
  afterSave(req: Requests.AfterSaveRequest, obj: Parse.Object): void | Promise<void> { }
  beforeDelete(req: Requests.BeforeDeleteRequest, obj: Parse.Object): void | Promise<void> { }
  afterDelete(req: Requests.AfterDeleteRequest, obj: Parse.Object): void | Promise<void> { }
}

export default Answer.instance;
