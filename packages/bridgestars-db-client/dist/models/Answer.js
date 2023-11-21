import { DbModel, Keys, Query, field } from "parse-sdk-ts";
import { Chapter } from "./Chapter";
/**
 * This class represents a course, it is just a wrapper for the database object contained in the data field but provides typing.
 */
export class Answer extends DbModel {
    static className = "Answer";
    static keys = Keys.build(Chapter, {
        user: "user",
        problem: "prob",
        solution: "sol",
    });
    user = field(this).pointer(Chapter, Answer.keys.user);
    problem = field(this).pointer(Chapter, Answer.keys.problem);
    solution = field(this).required([]).array(Answer.keys.solution);
    constructor(data) {
        super(data);
    }
    static create() {
        return DbModel.createWithoutData(Answer);
    }
    static query() {
        return new Query(Answer);
    }
}
