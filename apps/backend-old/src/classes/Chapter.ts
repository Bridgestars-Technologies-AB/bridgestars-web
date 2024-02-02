import "parse/node";
import DbObject, * as Requests from "./__DbObject__";
import Course from "./Course";
import { createRole, deleteRole } from "../utils/roles";
import { field, immutable, required, z } from "../utils/validate";
import { createAndSaveSlug, updateSlug } from "../utils/slug";
import { create } from "domain";

class Chapter extends DbObject {
  static instance = new Chapter();

  private constructor() {
    super({
      className: "Chapter",
      fields: {
        course: { type: "Pointer", targetClass: Course.className },
        idx: { type: "Number" },

        title: { type: "String" },
        desc: { type: "String" },
        n_prob: { type: "Number" },

        slug: { type: "String" },
      },
      indexes: {},
      classLevelPermissions: {
        find: { requiresAuthentication: true }, //depends on if next fetches via server or not
        count: { "role:Admin": true },
        get: { requiresAuthentication: true },
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
    required(req, "course");
    required(req, "title");
    required(req, "desc");
    immutable(req, "n_prob");
    field(req, "idx", z.number().int().nonnegative().safe().optional());

    field(req, "title", z.string().max(50));
    field(req, "desc", z.string().max(350));
    field(req, "n_prob", z.number().int().nonnegative().safe().default(0));
  }

  async beforeSave(
    req: Requests.BeforeSaveRequest,
    obj: Parse.Object,
  ): Promise<void> {
    if (obj.isNew()) {
      //increase chapter count
      const course = await obj.get("course").increment("n_chap").save(null, {
        useMasterKey: true,
        context: { noValidation: true },
      });

      // get temporary number
      if (!req.object.get("idx")) {
        await new Parse.Query(this.className)
          .equalTo("course", obj.get("course"))
          .descending("idx")
          .first({ useMasterKey: true }).then((c) => {
            req.object.set("idx", c ? c.get("idx") + 1 : 0);
          });
      }
    } else {
      updateSlug(obj);
    }
  }

  async afterSave(
    req: Requests.AfterSaveRequest,
    obj: Parse.Object,
  ): Promise<void> {
    if (!req.original) {
      // await createRole("chap-" + req.object.id);
      createAndSaveSlug(obj);
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
    // await deleteRole("chap-" + req.object.id);
    await req.object.get("course").decrement("n_chap").save(null, {
      useMasterKey: true,
    }).catch(() => { }); // in case course is deleted
  }
}

export default Chapter.instance;
