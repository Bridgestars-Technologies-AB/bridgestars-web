/**
 * @jest-environment jsdom
 */
import {
  DatabasePrimitive as Db,
  Query,
  useAuthMock as useAuth,
  UserInfo,
  wrap,
} from "bidding-db-client";
import { CODE } from "../../src/utils/errorcode";
import Util from "../Util";

describe("Create Account", () => {
  //
  //
  //
  //
  //
  //
  //
  //
  test("OK name, pass etc", async () => {
    await expect(Util.signUp()).resolves.toBeDefined();
  });
  //
  //
  //
  test("Change username", async () => {
    const auth = useAuth();
    await auth.signUp("Theo", "asdASD123", "theodor@test.test")
      .then((user) => {
        expect(user.data).toEqual(auth.user()?.data);
        expect(user.username.get()).toEqual("Theo");
        expect(user.usernameLower.get()).toEqual("theo");
        user.username.set("Erika");

        return user.save();
      });
    expect(auth.user()!.username.get()).toEqual("Erika");
    expect(auth.user()!.usernameLower.get()).toEqual("erika");
    auth.user()!.usernameLower.set("Erika");
    await auth.user()!.save();
    expect(auth.user()!.username.get()).toEqual("Erika");
    expect(auth.user()!.usernameLower.get()).toEqual("erika");
  });
  //
  //
  test("Username requirements", async () => {
    await useAuth().signUp(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      Util.pass(),
      Util.email(),
    )
      .catch((e) => {
        expect(e.message).toBe("Ett fält kunde inte sparas.");
        expect(e.meta).toEqual({
          key: "username",
          code: "too_big",
          maximum: 15,
          type: "string",
          message: "Användarnamnet får vara max 15 tecken långt",
        });
        expect(e.code).toBe(CODE.FieldValidationError);

      console.log({message: e.message, code: e.code, meta: e.meta})
      });
    await useAuth().signUp("a", Util.pass(), Util.email())
      .catch((e) => {
        expect(e.message).toBe("Ett fält kunde inte sparas.");
        expect(e.meta).toEqual({
          key: "username",
          code: "too_small",
          minimum: 3,
          type: "string",
          message: "Användarnamnet måste vara minst 3 tecken långt",
        });
        expect(e.code).toBe(CODE.FieldValidationError);
      });
    await useAuth().signUp("%hej", Util.pass(), Util.email())
      .catch((e) => {
        expect(e.message).toBe("Ett fält kunde inte sparas.");
        expect(e.meta).toEqual({
          key: "username",
          code: "invalid_string",
          message: "Användarnamnet måste börja med en bokstav",
        });
        expect(e.code).toBe(CODE.FieldValidationError);
      });
    expect.assertions(9);
  }),
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    test("Password requirements", async () => {
      await useAuth().signUp(Util.username(), "asd", Util.email())
        .catch(
          (e) => {
            expect(e.message).toBe("Ett fält kunde inte sparas.");
            expect(e.meta).toEqual({
              key: "password",
              code: "too_small",
              minimum: 8,
              type: "string",
              message: "Lösenordet måste vara minst 8 tecken långt",
            });
            expect(e.code).toBe(CODE.FieldValidationError);
          },
        );
      await useAuth().signUp(
        Util.username(2),
        "asdasdas",
        Util.email(2),
      )
        .catch((e) => {
          expect(e.message).toBe("Ett fält kunde inte sparas.");
          expect(e.meta).toEqual({
            key: "password",
            code: "invalid_string",
            message: "Lösenordet måste innehålla minst en siffra",
          });
          expect(e.code).toBe(CODE.FieldValidationError);
        });
      await useAuth().signUp(
        Util.username(3),
        "asdasdasd123",
        Util.email(3),
      )
        .catch((e) => {
          expect(e.message).toBe("Ett fält kunde inte sparas.");
          expect(e.meta).toEqual({
            key: "password",
            code: "invalid_string",
            message: "Lösenordet måste innehålla minst en stor bokstav",
          });
          expect(e.code).toBe(CODE.FieldValidationError);
        });
      expect.assertions(9);
    }),
    //
    //
    //
    //
    //
    //
    //
    test("Email requirements", async () => {
      await useAuth().signUp(
        Util.username(),
        Util.pass(),
        "testtest.test",
      )
        .catch((e) => {
          expect(e.message).toBe("Ett fält kunde inte sparas.");
          expect(e.meta).toEqual({
            key: "email",
            code: "invalid_string",
            message: "Mailadressen verkar inte vara giltig",
          });
          expect(e.code).toBe(CODE.FieldValidationError);
        });
      expect.assertions(3);
    }); //
  //
  //
  //

  test("Signup/Signin and Username", async () => {
    await expect(
      useAuth().signUp("tESt_user", Util.pass(), Util.email()),
    ).resolves.toBeDefined();

    await expect(useAuth().signOut()).resolves.toBeUndefined();

    await useAuth().signIn("test_user", Util.pass())
      .then((u) => {
        expect(u.username.get()).toEqual("tESt_user");
        expect(u.usernameLower.get()).toEqual("test_user");
      });

    await expect(useAuth().signIn(Util.email(), Util.pass())).resolves
      .toBeDefined();

    await useAuth().signIn("  TEST_User  ", Util.pass())
      .then((u) => {
        const parsed = u.printable();
        delete parsed["createdAt"];
        delete parsed["updatedAt"];
        expect(parsed).toEqual({
          className: "_User",
          courses: {attributeType: "SyntheticRelation", targetClassName: "Course", targetKey:"users"},
          id: u.id,
          email: Util.email(),
          username: "tESt_user",
          usernameLower: "test_user",
          image: {url:undefined},
          language: undefined,
        });
      });

    await expect(
      useAuth().signIn(Util.email(), Util.pass().toLowerCase()),
    )
      .rejects.toThrow();
  });
  //
  //
  //
  //
  //
  //
  test("UserInfo", async () => {
    const u = await Util.signUp();

    await expect(new Query(UserInfo).equalTo(UserInfo.keys.user, u.id).first())
      .rejects.toEqual(
        new Error("Åtkomst nekad."),
      );

    const i = await new Query(UserInfo).equalTo(UserInfo.keys.user, u.data)
      .useMasterKey()
      .first();
    if (!i) throw new Error("No user info");
    expect(i).toBeDefined();
    expect(i.user.get().id).toEqual(u.id);
    expect(i.user.toString()).toEqual(`Pointer<_User, ${i.user.get().id}>`);
    expect(i.lastLogin.get().getTime()).toBeGreaterThan(
      Date.now() - 1000 * 60,
    );
    // this should be the same user since the should only be one user object
    expect(i.user.get().username.get()).toEqual(u.username.get());
    // await i.user.get().fetch();
    // expect(i.user.get().username.get()).toEqual(u.username.get());

    await u.destroy({useMasterKey:true})
    const info = await new Query(UserInfo).equalTo(UserInfo.keys.user, u.data)
      .useMasterKey()
      .first();
    // check userinfo is deleted
    expect(info).toBeNull()

  });
});
