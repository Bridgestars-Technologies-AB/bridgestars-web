import { DbModel, Keys, Query, field } from "parse-sdk-ts";
import { DatabasePrimitive as Primitive } from "parse-sdk-ts";

import { Course } from "./Course";
import { Cloud } from "../cloud";


/**
 * This class represents an user, it is just a wrapper for the database object contained in the data field but provides typing.
 */
export class User extends DbModel {
  static readonly className: string = "_User";
  static readonly keys = Keys.build(User, {
    username: "dispName",
    usernameLower: "username",
    image: "image",
    language: "lang",
    email: "email",
    plan: "plan",
    planStatus: "plan_status",
  });

  readonly username = field(this).required().string(User.keys.username);
  readonly usernameLower = field(this).required().string(User.keys.usernameLower);
  readonly image = field(this).file(User.keys.image);
  readonly language = field(this).string(User.keys.language);
  readonly email = field(this).string(User.keys.email);
  readonly courses = field(this).syntheticRelation(Course, Course.keys.users);
  readonly plan = field(this).string(User.keys.plan);
  readonly planStatus = field(this).string(User.keys.planStatus);

  // cachedStatus: Status = Status.Offline;
  // statusFetchTime: Date = new Date(0);

  constructor(data: Primitive.User) {
    super(data);
  }

  getSessionToken() {
    return (this.data as Primitive.User).getSessionToken();
  }

  static query() {
    return new Query(User);
  }

  async joinCourse(course: Course) {
    return Cloud.joinCourse(course.id).then(() => course.fetch());
  }

  async leaveCourse(course: Course) {
    return Cloud.leaveCourse(course.id).then(() => course.fetch());
  }
}
