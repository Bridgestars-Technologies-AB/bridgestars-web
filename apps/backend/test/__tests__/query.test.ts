/**
 * @jest-environment jsdom
 */
import Util from "../Util";
import { CODE } from "../../src/utils/errorcode";
import { Course, DatabasePrimitive, Query, User } from "bidding-db-client";

describe("Query", () => {
  //
  //
  test("typed parameters", async () => {
    const u1 = await Util.signUp();
    const u2 = await Util.signUp(2);

    await new Query(User)
      .ascending(User.keys.username)
      .find()
      .then((users) => {
        expect(users.length).toBe(2);
        expect(JSON.stringify(u1)).toEqual(JSON.stringify(users[0]));
        const fetched = JSON.parse(JSON.stringify(users[1]));
        const signedin = JSON.parse(JSON.stringify(u2));
        expect(fetched).toEqual(signedin);
      });

    // await DB.User.query().findAll()
    // .then((users) => {
    //   expect(users.length).toBe(2);
    //   expect(users).toContain(u2);
    //   expect(users).toContain(u1);
    // })
  });
  //
  //
  //
  //
  //
  test("Exclude key", async () => {
    const u1 = await Util.signUp();
    // await Util.setupCourses(2)
    expect(u1.username.get()).toBeDefined();


    const users = await User.query().exclude(User.keys.username).find();

    // this is some wierd behaviour, we should keep the username from before
    expect(users[0].username.get()).toBeUndefined();
    expect(u1.username.get()).toBeUndefined();

    expect.assertions(3);
  });
  //
  //
  //
  //
  //
  test("Select keys", async () => {
    const u1 = await Util.signUp();
    let u2 = await Util.signUp(2);

    let users = await User.query()
      .select(User.keys.username)
      .find();

    expect(users[0].username.get()).toBeDefined();
    expect(users[0].usernameLower.get()).toBeDefined();

    expect(users[1].username.get()).toBeDefined();
    expect(users[1].usernameLower.get()).toBeDefined();

    const u2id = u2.id;
    expect(new DatabasePrimitive.User({id: u2id}).get("username")).toBeDefined()
    await Util.signOut()
    expect(new DatabasePrimitive.User({id: u2id}).get("username")).toBeUndefined()
    // await Util.signIn()
    users = [];
    u2 = null;

    await Util.signIn();

    users = await User.query()
      .select(User.keys.username)
      .find();

    //own user is defined
    expect(users[0].username.get()).toBeDefined();
    expect(users[0].usernameLower.get()).toBeDefined();

    expect(users[1].username.get()).toBeDefined();
    expect(users[1].usernameLower.get()).toBeUndefined();

    expect.assertions(10);

  });
});
