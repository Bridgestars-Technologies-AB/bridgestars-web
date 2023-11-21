/// <reference types="parse" />
import { OptionalString, Pointer, RequiredArray, RequiredNumber, RequiredString } from "parse-sdk-ts/attributes";
import { DbModel, Query } from "parse-sdk-ts";
import { DatabasePrimitive as Primitive } from "parse-sdk-ts";
import { Chapter } from "./Chapter";
/**
 * This class represents a course, it is just a wrapper for the database object contained in the data field but provides typing.
 */
export declare class Problem extends DbModel {
    static readonly className: string;
    static readonly keys: {
        chapter: import("parse-sdk-ts").TypedKey<Problem>;
        index: import("parse-sdk-ts").TypedKey<Problem>;
        title: import("parse-sdk-ts").TypedKey<Problem>;
        description: import("parse-sdk-ts").TypedKey<Problem>;
        north: import("parse-sdk-ts").TypedKey<Problem>;
        south: import("parse-sdk-ts").TypedKey<Problem>;
        east: import("parse-sdk-ts").TypedKey<Problem>;
        west: import("parse-sdk-ts").TypedKey<Problem>;
        solution: import("parse-sdk-ts").TypedKey<Problem>;
        comments: import("parse-sdk-ts").TypedKey<Problem>;
    };
    readonly chapter: Pointer<Chapter>;
    readonly index: RequiredNumber;
    readonly title: RequiredString;
    readonly description: OptionalString;
    readonly north: RequiredNumber;
    readonly south: RequiredNumber;
    readonly east: RequiredNumber;
    readonly west: RequiredNumber;
    readonly solution: RequiredArray<number>;
    readonly comments: RequiredArray<string>;
    constructor(data: Primitive.Object);
    static create(): Problem;
    static wrap(data: Primitive.Object): Problem;
    static query(): Query<Problem>;
}
