import { DbModel, Keys, Query, field } from "parse-sdk-ts";
import { User } from "./User";

/**
 * This class represents an user, it is just a wrapper for the database object contained in the data field but provides typing.
 */
export class UserInfo extends DbModel {
  static readonly className: string = "UserInfo";
  static readonly keys = Keys.build(UserInfo, {
    lastLogin: "last_login",
    user: "user",
    migrated: "migrated",
    emailsSent: "emails_sent",
  });

  readonly lastLogin = field(this).required().date(UserInfo.keys.lastLogin);
  readonly user = field(this).pointer(User, UserInfo.keys.user);
  readonly migrated = field(this).boolean(UserInfo.keys.migrated);
  readonly emailsSent = field(this).array<string>(UserInfo.keys.emailsSent);

  static query() {
    return new Query(UserInfo);
  }
}
