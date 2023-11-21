import { DbModel, Keys, Query, field } from "parse-sdk-ts";
import { Chapter } from "./Chapter";
import { User } from "./User";
/**
 * This class represents a course, it is just a wrapper for the database object contained in the data field but provides typing.
 */
export class Course extends DbModel {
    static className = "Course";
    static keys = Keys.build(Course, {
        index: "idx",
        title: "title",
        description: "desc",
        numberChapters: "n_chap",
        numberUsers: "n_user",
        users: "users",
        slug: "slug",
    });
    index = field(this).required().number(Course.keys.index);
    title = field(this).required().string(Course.keys.title);
    description = field(this).required().string(Course.keys.description);
    numberChapters = field(this).required().number(Course.keys.numberChapters);
    numberUsers = field(this).required().number(Course.keys.numberUsers);
    chapters = field(this).syntheticRelation(Chapter, Chapter.keys.course);
    users = field(this).relation(User, Course.keys.users);
    slug = field(this).required().string(Course.keys.slug);
    constructor(data) {
        super(data);
    }
    static create() {
        return DbModel.createWithoutData(Course);
    }
    static query() {
        return new Query(Course);
    }
}
