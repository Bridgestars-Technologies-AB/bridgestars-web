import { DbModel, Keys, Query, field } from "parse-sdk-ts";
import { DatabasePrimitive as Primitive } from "parse-sdk-ts";

import { Chapter } from "./Chapter";
import { User } from "./User";
import { Relation } from "parse-sdk-ts/attributes";

/**
 * This class represents a course, it is just a wrapper for the database object contained in the data field but provides typing.
 */
export class Course extends DbModel {
  static readonly className: string = "Course";
  static readonly keys = Keys.build(Course, {
    index: "idx",

    title: "title",
    description: "desc",

    numberChapters: "n_chap",
    numberUsers: "n_user",
    users: "users",

    slug: "slug",
  });

  readonly index = field(this).required().number(Course.keys.index);

  readonly title = field(this).required().string(Course.keys.title);
  readonly description = field(this).required().string(Course.keys.description);

  readonly numberChapters = field(this).required().number(
    Course.keys.numberChapters,
  );
  readonly numberUsers = field(this).required().number(Course.keys.numberUsers);

  readonly chapters = field(this).syntheticRelation(
    Chapter,
    Chapter.keys.course,
  );

  readonly users = field(this).relation(User, Course.keys.users) as Relation<User>;

  readonly slug = field(this).required().string(Course.keys.slug);

  constructor(data: Primitive.Object) {
    super(data);
  }

  static create() {
    return DbModel.createWithoutData(Course);
  }

  static query() {
    return new Query(Course);
  }
}
