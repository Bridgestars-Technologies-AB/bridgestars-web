import { DbModel, Keys, Query, field } from "parse-sdk-ts";
import { Chapter } from "./Chapter";
/**
 * This class represents a course, it is just a wrapper for the database object contained in the data field but provides typing.
 */
export class Problem extends DbModel {
    static className = "Problem";
    static keys = Keys.build(Problem, {
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
    chapter = field(this).pointer(Chapter, Problem.keys.chapter);
    index = field(this).required().number(Problem.keys.index);
    title = field(this).required().string(Problem.keys.title);
    description = field(this).string(Problem.keys.description);
    north = field(this).required().number(Problem.keys.north);
    south = field(this).required().number(Problem.keys.south);
    east = field(this).required().number(Problem.keys.east);
    west = field(this).required().number(Problem.keys.west);
    solution = field(this).required([]).array(Problem.keys.solution);
    comments = field(this).required([]).array(Problem.keys.comments);
    constructor(data) {
        super(data);
    }
    static create() {
        return DbModel.createWithoutData(Problem);
    }
    static wrap(data) {
        return new Problem(data);
    }
    static query() {
        return new Query(Problem);
    }
}
