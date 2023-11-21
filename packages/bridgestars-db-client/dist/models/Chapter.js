import { DbModel, Keys, Query, field } from "parse-sdk-ts";
import { Course } from "./Course";
import { Problem } from "./Problem";
export class Chapter extends DbModel {
    static className = "Chapter";
    static keys = Keys.build(Chapter, {
        course: "course",
        index: "idx",
        title: "title",
        description: "desc",
        numberProblems: "n_prob",
        slug: "slug"
    });
    course = field(this).pointer(Course, Chapter.keys.course);
    index = field(this).required().number(Chapter.keys.index);
    title = field(this).required().string(Chapter.keys.title);
    description = field(this).required().string(Chapter.keys.description);
    numberProblems = field(this).required().number(Chapter.keys.numberProblems);
    problems = field(this).syntheticRelation(Problem, Problem.keys.chapter);
    slug = field(this).required().string(Chapter.keys.slug);
    static create() {
        return DbModel.createWithoutData(Chapter);
    }
    static query() {
        return new Query(Chapter);
    }
}
