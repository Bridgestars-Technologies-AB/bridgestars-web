import { DbModel, Keys, Query, field } from "parse-sdk-ts";
import { DatabasePrimitive as Primitive } from "parse-sdk-ts";

import { Course } from "./Course";
import { Problem } from "./Problem";

export class Chapter extends DbModel {
  static readonly className: string = "Chapter";
  static readonly keys = Keys.build(Chapter, {
    course: "course",
    index: "idx",

    title: "title",
    description: "desc",
    numberProblems: "n_prob",
    slug:"slug"
  });

  readonly course = field(this).pointer(Course, Chapter.keys.course);
  readonly index = field(this).required().number(Chapter.keys.index);

  readonly title = field(this).required().string(Chapter.keys.title);
  readonly description = field(this).required().string(Chapter.keys.description);

  readonly numberProblems = field(this).required().number(Chapter.keys.numberProblems);

  readonly problems = field(this).syntheticRelation(Problem, Problem.keys.chapter);

  readonly slug = field(this).required().string(Chapter.keys.slug)

  static create() {
    return DbModel.createWithoutData(Chapter);
  }


  static query() {
    return new Query(Chapter);
  }
}
