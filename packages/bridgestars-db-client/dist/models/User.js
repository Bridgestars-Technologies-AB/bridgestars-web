import { DbModel, Keys, Query, field } from "parse-sdk-ts";
import { Course } from "./Course";
import { Cloud } from "../cloud";
/**
 * This class represents an user, it is just a wrapper for the database object contained in the data field but provides typing.
 */
export class User extends DbModel {
    static className = "_User";
    static keys = Keys.build(User, {
        username: "dispName",
        usernameLower: "username",
        image: "image",
        language: "lang",
        email: "email",
        plan: "plan",
        planStatus: "plan_status",
    });
    username = field(this).required().string(User.keys.username);
    usernameLower = field(this).required().string(User.keys.usernameLower);
    image = field(this).file(User.keys.image);
    language = field(this).string(User.keys.language);
    email = field(this).string(User.keys.email);
    courses = field(this).syntheticRelation(Course, Course.keys.users);
    plan = field(this).string(User.keys.plan);
    planStatus = field(this).string(User.keys.planStatus);
    // cachedStatus: Status = Status.Offline;
    // statusFetchTime: Date = new Date(0);
    constructor(data) {
        super(data);
    }
    getSessionToken() {
        return this.data.getSessionToken();
    }
    static query() {
        return new Query(User);
    }
    async joinCourse(course) {
        return Cloud.joinCourse(course.id).then(() => course.fetch());
    }
    async leaveCourse(course) {
        return Cloud.leaveCourse(course.id).then(() => course.fetch());
    }
}
