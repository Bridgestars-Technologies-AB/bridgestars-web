/// <reference types="parse" />
import { DbModel, Query } from "parse-sdk-ts";
import { DatabasePrimitive as Primitive } from "parse-sdk-ts";
import { Course } from "./Course";
/**
 * This class represents an user, it is just a wrapper for the database object contained in the data field but provides typing.
 */
export declare class User extends DbModel {
    static readonly className: string;
    static readonly keys: {
        username: import("parse-sdk-ts").TypedKey<User>;
        usernameLower: import("parse-sdk-ts").TypedKey<User>;
        image: import("parse-sdk-ts").TypedKey<User>;
        language: import("parse-sdk-ts").TypedKey<User>;
        email: import("parse-sdk-ts").TypedKey<User>;
        plan: import("parse-sdk-ts").TypedKey<User>;
        planStatus: import("parse-sdk-ts").TypedKey<User>;
    };
    readonly username: import("parse-sdk-ts/attributes").RequiredString;
    readonly usernameLower: import("parse-sdk-ts/attributes").RequiredString;
    readonly image: import("parse-sdk-ts/attributes").File;
    readonly language: import("parse-sdk-ts/attributes").OptionalString;
    readonly email: import("parse-sdk-ts/attributes").OptionalString;
    readonly courses: import("parse-sdk-ts/attributes").SyntheticRelation<Course>;
    readonly plan: import("parse-sdk-ts/attributes").OptionalString;
    readonly planStatus: import("parse-sdk-ts/attributes").OptionalString;
    constructor(data: Primitive.User);
    getSessionToken(): string;
    static query(): Query<User>;
    joinCourse(course: Course): Promise<Course>;
    leaveCourse(course: Course): Promise<Course>;
}
