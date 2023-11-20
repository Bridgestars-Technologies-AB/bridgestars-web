import "parse/node";
import DbObject, * as Requests from "./__DbObject__";
import { field, immutable, required, z } from "../utils/validate";
import User from './_User'
import { createRole, deleteRole } from "../utils/roles";
import { createAndSaveSlug, updateSlug } from "../utils/slug";

class Course extends DbObject {
  static instance = new Course();

  private constructor() {
    super({
      className: "Course",
      fields: {
        idx: { type: "Number" },

        title: { type: "String" },
        desc: { type: "String" },
        n_chap: { type: "Number" },
        n_user: { type: "Number" },
        users: { type: "Relation", targetClass: User.className },

        slug: { type: "String" },
      },
      indexes: {},
      classLevelPermissions: {
        find: { requiresAuthentication: true },
        count: { requiresAuthentication: true },
        get: { requiresAuthentication: true },
        update: { "role:Mod": true },
        create: { "role:Mod": true },
        delete: { "role:Mod": true },
        protectedFields: {
          "*": [],
        },
      },
    });
  }

  validate(req: Requests.BeforeSaveRequest, obj: Parse.Object): void {
    required(req, "title");
    required(req, "desc");
    immutable(req, "n_chap");
    immutable(req, "n_user");
    field(req, "title", z.string().max(50));
    field(req, "desc", z.string().max(350));
    field(req, "n_chap", z.number().int().nonnegative().safe().default(0));
    field(req, "n_user", z.number().int().nonnegative().safe().default(0));

    field(req, "idx", z.number().int().nonnegative().safe().optional());
  }

  async beforeSave(req: Requests.BeforeSaveRequest, obj: Parse.Object): Promise<void> {
    if (obj.isNew()) {
      // get chapter with the largest num + 1
      if (!obj.get("idx")) {
        await new Parse.Query(this.className)
          .descending("idx")
          .first({ useMasterKey: true }).then((c) => {
            obj.set("idx", c ? c.get("idx") + 1 : 0);
          });
      }
    }
    else{
      updateSlug(obj)
    }
  }
  async afterSave(req: Requests.AfterSaveRequest, obj: Parse.Object): Promise<void> {
    if (!req.original) {
      await createRole("course-" + obj.id);
      createAndSaveSlug(obj)
    }
  }

  async beforeDelete(req: Requests.BeforeDeleteRequest, obj: Parse.Object): Promise<void> { }

  async afterDelete(req: Requests.AfterDeleteRequest, obj: Parse.Object): Promise<void> {
    await deleteRole("course-" + req.object.id);
  }
}

export default Course.instance;
