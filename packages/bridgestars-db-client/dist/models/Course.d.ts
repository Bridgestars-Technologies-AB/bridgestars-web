/// <reference types="parse" />
import { DbModel, Query } from "parse-sdk-ts";
import { DatabasePrimitive as Primitive } from "parse-sdk-ts";
import { Chapter } from "./Chapter";
import { User } from "./User";
import { Relation } from "parse-sdk-ts/attributes";
/**
 * This class represents a course, it is just a wrapper for the database object contained in the data field but provides typing.
 */
export declare class Course extends DbModel {
    static readonly className: string;
    static readonly keys: {
        index: import("parse-sdk-ts").TypedKey<Course>;
        title: import("parse-sdk-ts").TypedKey<Course>;
        description: import("parse-sdk-ts").TypedKey<Course>;
        numberChapters: import("parse-sdk-ts").TypedKey<Course>;
        numberUsers: import("parse-sdk-ts").TypedKey<Course>;
        users: import("parse-sdk-ts").TypedKey<Course>;
        slug: import("parse-sdk-ts").TypedKey<Course>;
    };
    readonly index: import("parse-sdk-ts/attributes").RequiredNumber;
    readonly title: import("parse-sdk-ts/attributes").RequiredString;
    readonly description: import("parse-sdk-ts/attributes").RequiredString;
    readonly numberChapters: import("parse-sdk-ts/attributes").RequiredNumber;
    readonly numberUsers: import("parse-sdk-ts/attributes").RequiredNumber;
    readonly chapters: import("parse-sdk-ts/attributes").SyntheticRelation<Chapter>;
    readonly users: Relation<User>;
    readonly slug: import("parse-sdk-ts/attributes").RequiredString;
    constructor(data: Primitive.Object);
    static create(): Course;
    static query(): Query<Course>;
}
