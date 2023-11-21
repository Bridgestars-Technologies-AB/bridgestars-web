/**
 * @jest-environment jsdom
 */
import Util from "../Util";
import { CODE } from "../../src/utils/errorcode";
import {
  Course,
  DatabasePrimitive,
  Query,
  User,
  UserInfo,
} from "db-client";

describe("Attributes", () => {
  //
  //
  test("is ok with circular dependencies", async () => {
    const u = await Util.signUp();
    const course = await Util.createCourse();
    course.users.add(u);
    await course.saveAsMaster();
    expect(await course.users.findAll()).toHaveLength(1);
    expect(await u.courses.findAll()).toHaveLength(1);
  });
  test("pointer", async () => {
    const u = await Util.signUp();
    const info = await UserInfo.query().equalTo(UserInfo.keys.user, u)
      .asMaster().first();
    expect(info).toBeDefined();
    expect(info!.user.get()).toBeDefined();
    expect(info!.user.get()!.printable()).toEqual(u.printable());
  });
  test("pointer", async () => { });
  test("optional", async () => { });
  test("string", async () => { });
  test("number", async () => { });
  test("boolean", async () => { });
  test("object", async () => { });
  test("string pointer", async () => { });
  test("synthetic relation", async () => { });
  test("array", async () => { });
});
