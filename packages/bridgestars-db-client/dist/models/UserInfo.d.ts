import { DbModel, Query } from "parse-sdk-ts";
import { User } from "./User";
/**
 * This class represents an user, it is just a wrapper for the database object contained in the data field but provides typing.
 */
export declare class UserInfo extends DbModel {
    static readonly className: string;
    static readonly keys: {
        lastLogin: import("parse-sdk-ts").TypedKey<UserInfo>;
        user: import("parse-sdk-ts").TypedKey<UserInfo>;
        migrated: import("parse-sdk-ts").TypedKey<UserInfo>;
        emailsSent: import("parse-sdk-ts").TypedKey<UserInfo>;
    };
    readonly lastLogin: import("parse-sdk-ts/attributes").RequiredDate;
    readonly user: import("parse-sdk-ts/attributes").Pointer<User>;
    readonly migrated: import("parse-sdk-ts/attributes").OptionalBoolean;
    readonly emailsSent: import("parse-sdk-ts/attributes").OptionalArray<string>;
    static query(): Query<UserInfo>;
}
