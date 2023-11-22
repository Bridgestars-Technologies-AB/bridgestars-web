import { DbModel, Keys, Query, field } from "parse-sdk-ts";

import { DatabasePrimitive as Primitive } from "parse-sdk-ts";
import { Chapter } from "./Chapter";

/**
 * This class represents a course, it is just a wrapper for the database object contained in the data field but provides typing.
 */
export class Problem extends DbModel {
  static readonly className: string = "Problem";
  static readonly keys = Keys.build(Problem, {
    chapter: "chap",
    index: "idx",

    title: "title",
    description: "desc",
    north: "n",
    south: "s",
    east: "e",
    west: "w",
    solution: "sol",
    comments: "com",
  });

  readonly chapter = field(this).pointer(Chapter, Problem.keys.chapter);
  readonly index = field(this).required().number(Problem.keys.index);

  readonly title = field(this).required().string(Problem.keys.title);
  readonly description = field(this).string(Problem.keys.description);
  readonly north = field(this).required().number(Problem.keys.north);
  readonly south = field(this).required().number(Problem.keys.south);
  readonly east = field(this).required().number(Problem.keys.east);
  readonly west = field(this).required().number(Problem.keys.west);
  readonly solution = field(this).required([]).array<number>(Problem.keys.solution);
  readonly comments = field(this).required([]).array<string>(Problem.keys.comments);

  constructor(data: Primitive.Object) {
    super(data);
  }

  static create() {
    return DbModel.createWithoutData(Problem);
  }

  static wrap(data: Primitive.Object) {
    return new Problem(data);
  }

  static query() {
    return new Query(Problem);
  }
}
