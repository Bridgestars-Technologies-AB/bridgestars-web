/// <reference types="parse" />
import { Pointer, RequiredArray } from "parse-sdk-ts/attributes";
import { DbModel, Query } from "parse-sdk-ts";
import { DatabasePrimitive as Primitive } from "parse-sdk-ts";
import { Chapter } from "./Chapter";
/**
 * This class represents a course, it is just a wrapper for the database object contained in the data field but provides typing.
 */
export declare class Answer extends DbModel {
    static readonly className: string;
    static readonly keys: {
        user: import("parse-sdk-ts").TypedKey<Chapter>;
        problem: import("parse-sdk-ts").TypedKey<Chapter>;
        solution: import("parse-sdk-ts").TypedKey<Chapter>;
    };
    readonly user: Pointer<Chapter>;
    readonly problem: Pointer<Chapter>;
    readonly solution: RequiredArray<Number>;
    constructor(data: Primitive.Object);
    static create(): Answer;
    static query(): Query<Answer>;
}
