import fail, { CODE } from "./fail";

export default class UserInfo {
  static get = async (user: Parse.User) => {
    return await new Parse.Query("UserInfo")
      .equalTo("user", user)
      .first({ useMasterKey: true });
  };

  static create = async (user: Parse.User) => {
    if (!user?.id) {
      fail(
        "Internal: Tried to create UserInfo for undefined user",
        CODE.InternalError,
      );
    }
    return new Parse.Object("UserInfo").save({
      user: user,
      last_login: new Date(),
    }, { useMasterKey: true });
  };

  static delete = async (user: Parse.User) => {
    const info = await new Parse.Query("UserInfo")
      .equalTo("user", user)
      .first({ useMasterKey: true });
    return await info?.destroy({ useMasterKey: true });
  };

  static setLastLogin = async (user: Parse.User) => {
    return this.get(user).then((info) =>
      info?.save({ last_login: new Date() }, { useMasterKey: true })
    );
  };
  static update = async (user: Parse.User, data: any) => {
    return this.get(user).then((info) =>
      info?.save(data, { useMasterKey: true })
    );
  }
}
