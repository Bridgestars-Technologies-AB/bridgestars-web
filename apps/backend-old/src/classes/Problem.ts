import "parse/node";
import DbObject, * as Requests from "./__DbObject__";
import Chapter from "./Chapter";
import { field, immutable, refExists, required, z } from "../utils/validate";

class Problem extends DbObject {
  static instance = new Problem();

  private constructor() {
    super({
      className: "Problem",
      fields: {
        chap: { type: "Pointer", targetClass: Chapter.className },
        idx: { type: "Number" },

        title: { type: "String" },
        desc: { type: "String" },
        n: { type: "Number" },
        s: { type: "Number" },
        e: { type: "Number" },
        w: { type: "Number" },
        sol: { type: "Array" },
        com: { type: "Array" },
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
    required(req, "chap");
    required(req, "title");
    required(req, "n");
    required(req, "s");
    required(req, "e");
    required(req, "w");
    required(req, "sol");
    field(req, "idx", z.number().int().nonnegative().safe().optional());

    field(req, "title", z.string().max(50));
    field(req, "desc", z.string().max(1000).optional());
    field(req, "n", z.number().safe().int());
    field(req, "s", z.number().safe().int());
    field(req, "e", z.number().safe().int());
    field(req, "w", z.number().safe().int());
    field(
      req,
      "sol",
      z.array(z.number().safe().int().min(0).max(31)).min(4).max(50),
    );
    field(req, "com", z.array(z.string().max(300)).default([]));
  }

  async beforeSave(
    req: Requests.BeforeSaveRequest,
    obj: Parse.Object,
  ): Promise<void> {
    if (obj.isNew()) {
      const chapter = obj.get("chap");
      await chapter.fetch({ useMasterKey: true });
      const course = chapter.get("course");
      // acl
      const acl = new Parse.ACL();
      acl.setRoleReadAccess("course-" + course.id, true);
      obj.setACL(acl);

      // increment chapter
      await chapter.increment("n_prob").save(null, {
        useMasterKey: true,
        context: { noValidation: true },
      }); //also fetches!

      if (!obj.get("idx")) {
        await new Parse.Query(this.className)
          .equalTo("chap", chapter)
          .descending("idx")
          .first({ useMasterKey: true }).then((p) => {
            obj.set("idx", p ? p.get("idx") + 1 : 0);
          });
      }
    }
  }
  afterSave(
    req: Requests.AfterSaveRequest,
    obj: Parse.Object,
  ): void | Promise<void> { }
  beforeDelete(
    req: Requests.BeforeDeleteRequest,
    obj: Parse.Object,
  ): void | Promise<void> { }
  afterDelete(
    req: Requests.AfterDeleteRequest,
    obj: Parse.Object,
  ): void | Promise<void> {
    //decrement chapter
    obj.get("chap").decrement("n_prob").save(null, {
      useMasterKey: true,
      context: { noValidation: true },
    }).catch(() => { }); // in case chapter is deleted
  }
}

export default Problem.instance;
