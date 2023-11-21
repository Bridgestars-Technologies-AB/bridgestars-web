import { DbModel, Query } from "parse-sdk-ts";
import { Course } from "./Course";
import { Problem } from "./Problem";
export declare class Chapter extends DbModel {
    static readonly className: string;
    static readonly keys: {
        course: import("parse-sdk-ts").TypedKey<Chapter>;
        index: import("parse-sdk-ts").TypedKey<Chapter>;
        title: import("parse-sdk-ts").TypedKey<Chapter>;
        description: import("parse-sdk-ts").TypedKey<Chapter>;
        numberProblems: import("parse-sdk-ts").TypedKey<Chapter>;
        slug: import("parse-sdk-ts").TypedKey<Chapter>;
    };
    readonly course: import("parse-sdk-ts/attributes").Pointer<Course>;
    readonly index: import("parse-sdk-ts/attributes").RequiredNumber;
    readonly title: import("parse-sdk-ts/attributes").RequiredString;
    readonly description: import("parse-sdk-ts/attributes").RequiredString;
    readonly numberProblems: import("parse-sdk-ts/attributes").RequiredNumber;
    readonly problems: import("parse-sdk-ts/attributes").SyntheticRelation<Problem>;
    readonly slug: import("parse-sdk-ts/attributes").RequiredString;
    static create(): Chapter;
    static query(): Query<Chapter>;
}
