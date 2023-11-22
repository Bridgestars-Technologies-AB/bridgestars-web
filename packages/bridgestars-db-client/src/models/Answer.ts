import { DbModel, Keys, Query, field } from "parse-sdk-ts";

import { DatabasePrimitive as Primitive } from "parse-sdk-ts";
import { Chapter } from "./Chapter";

/**
 * This class represents a course, it is just a wrapper for the database object contained in the data field but provides typing.
 */
export class Answer extends DbModel {
  static readonly className: string = "Answer";
  static readonly keys = Keys.build(Chapter, {
    user: "user",
    problem: "prob",
    solution: "sol",
  });

  readonly user = field(this).pointer(Chapter, Answer.keys.user);
  readonly problem = field(this).pointer(Chapter, Answer.keys.problem);
  readonly solution = field(this).required([]).array<Number>(Answer.keys.solution);

  constructor(data: Primitive.Object) {
    super(data);
  }

  static create() {
    return DbModel.createWithoutData(Answer);
  }

  static query() {
    return new Query(Answer);
  }
}
