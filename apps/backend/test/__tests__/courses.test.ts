/**
 * @jest-environment jsdom
 */
import Util from "../Util";
import { CODE } from "../../src/utils/errorcode";
import {
  Chapter,
  Cloud,
  Course,
  Problem,
  useAuthMock as useAuth,
  User,
} from "bidding-db-client";
import sleep from "../sleep";

describe("Course", () => {
  //
  //
  test("add nonexisting course", async () => {
    const user = await Util.signUp();
    expect(await user.courses.findAll()).toEqual([]);
    try {
      await Cloud.joinCourse("hej");
      //user.courses.add(Course.create());
    } catch (e: any) {
      expect(e.message).toEqual("Objektet kunde inte hittas.")
    }
    const course = Course.create();
    course.description.set("test");
    course.title.set("test");
    await course.save({ useMasterKey: true });

    console.log(course.id);
    await Cloud.joinCourse(course.id);
    expect(course.numberUsers.get()).toEqual(0);
    await course.fetch();
    expect(course.numberUsers.get()).toEqual(1);
    expect(await course.users.query().asMaster().count()).toEqual(1);
    expect(await user.courses.query().asMaster().count()).toEqual(1);

    await user.leaveCourse(course);
    expect(course.numberUsers.get()).toEqual(0);
    expect(await course.users.query().asMaster().count()).toEqual(0);
    expect(await user.courses.query().asMaster().count()).toEqual(0);

    await user.joinCourse(course);
    expect(course.numberUsers.get()).toEqual(1);
    expect(await course.users.query().asMaster().count()).toEqual(1);
    expect(await user.courses.query().asMaster().count()).toEqual(1);

    expect.assertions(12);
  }, 10000);
  //
  //
  //
  //
  //
  //
  test("Test create course", async () => {
    await Util.signUp();

    const course = Course.create();
    await course.save()
      .catch((e) => {
        expect(e).toBeTruthy();
        expect(e.code).toBe(119);
        expect(e.message).toBe("Åtkomst nekad.");
      });

    await course.save({ useMasterKey: true })
      .catch((e) => {
        expect(e.code).toBe(CODE.RequiredField);
        expect(e.message).toBe("Ett fält saknas.");
        expect(e.meta).toEqual({ key: "title" });
      });

    course.title.set("Testkurs");
    await course.save({ useMasterKey: true })
      .catch((e) => {
        expect(e.code).toBe(CODE.RequiredField);
        // vet ej hur jag vill göra detta bra
        // jag vill kunna ge ett meddelande som kan visas för användaren
        expect(e.message).toBe("Ett fält saknas.");
        expect(e.meta).toEqual({ key: "desc" });
      });

    course.description.set("En nice kurs");
    await course.save({ useMasterKey: true })
      .then(async (c) => {
        expect(c).toBeTruthy();
        expect(c.id).toBe(course.id);
        expect(c.id).toBeTruthy();
        expect(c.description.get()).toBe("En nice kurs");
        expect(c.title.get()).toBe("Testkurs");
        expect(await c.users.query().useMasterKey().count()).toEqual(0);
        expect(c.numberChapters.get()).toEqual(0);
        expect(c.index.get()).toEqual(0);
      });

    expect.assertions(17);
  });
  //
  //
  //
  //
  //
  //
  //
  //
  test("Test create chapter", async () => {
    const u = await Util.signUp();
    const course = Course.create();
    course.title.set("TestKurs");
    course.description.set("En nice kurs");
    await course.saveAsMaster();
    expect(course.id).toBeTruthy();
    expect(course.numberChapters.get()).toEqual(0);
    expect(await course.users.query().useMasterKey().count()).toEqual(0);
    expect(course.index.get()).toEqual(0);

    const chapter = Chapter.create();
    await chapter.save().catch((e) => {
      expect(e.message).toBe("Åtkomst nekad.");
      expect(e.code).toBe(CODE.OperationForbidden);
      expect(e.meta).toEqual({
        original: "Permission denied for action create on class Chapter.",
      });
    });
    await chapter.saveAsMaster().catch((e) => {
      expect(e.message).toBe("Ett fält saknas.");
      expect(e.code).toBe(CODE.RequiredField);
      expect(e.meta).toEqual({ key: "course" });
    });
    chapter.course.set(course);
    await chapter.saveAsMaster().catch((e) => {
      expect(e.message).toBe("Ett fält saknas.");
      expect(e.code).toBe(CODE.RequiredField);
      expect(e.meta).toEqual({ key: "title" });
    });
    chapter.title.set("TestKapitel");
    await chapter.saveAsMaster().catch((e) => {
      expect(e.message).toBe("Ett fält saknas.");
      expect(e.code).toBe(CODE.RequiredField);
      expect(e.meta).toEqual({ key: "desc" });
    });
    chapter.description.set("Ett nice kapitel");
    await chapter.saveAsMaster();
    expect(chapter.id).toBeTruthy();
    expect(chapter.index.get()).toEqual(0);
    expect(chapter.numberProblems.get()).toEqual(0);

    const chap2 = Chapter.create();
    chap2.title.set("TestKapitel2");
    chap2.description.set("Ett nice kapitel2");
    chap2.course.set(course);
    await chap2.saveAsMaster();
    expect(chap2.index.get()).toEqual(1);
    expect(course.numberChapters.get()).toEqual(0);
    await course.fetch();
    expect(course.numberChapters.get()).toEqual(2);

    await course.chapters.query() // no masterkey
      .ascending(Chapter.keys.index)
      .find().then((chaps) => {
        expect(chaps.length).toEqual(2);
        expect(chaps[0].printable()).toEqual(chapter.printable());
        expect(chaps[1].printable()).toEqual(chap2.printable());
      });

    expect(await course.users.query().useMasterKey().count()).toEqual(0);
    // u.courses.add(course)
    Cloud.joinCourse(course.id);
    await u.save();
    await course.fetch();
    // expect(course.numberUsers.get()).toEqual(1)
    await course.users.query().find().then((users) => {
      expect(users.length).toEqual(1);
      expect(users[0].printable()).toEqual(u.printable());
    });
    expect.assertions(28);
  });
  //
  //
  //
  //
  //
  //
  //
  test("Create problem", async () => {
    const user = await Util.signUp();

    const course = Course.create();
    course.title.set("TestKurs");
    course.description.set("En nice kurs");
    await course.saveAsMaster();

    const chapter = Chapter.create();
    chapter.title.set("TestKapitel");
    chapter.description.set("Ett nice kapitel");
    chapter.course.set(course);
    await chapter.saveAsMaster();

    const problem = Problem.create();
    await problem.save().catch((e) => {
      expect(e.message).toBe("Åtkomst nekad.");
      expect(e.code).toBe(CODE.OperationForbidden);
      expect(e.meta).toEqual({
        original: "Permission denied for action create on class Problem.",
      });
    });
    await problem.saveAsMaster().catch((e) => {
      expect(e.message).toBe("Ett fält saknas.");
      expect(e.code).toBe(CODE.RequiredField);
      expect(e.meta).toEqual({ key: "chap" });
    });
    problem.chapter.set(chapter);
    await problem.saveAsMaster().catch((e) => {
      expect(e.message).toBe("Ett fält saknas.");
      expect(e.code).toBe(CODE.RequiredField);
      expect(e.meta).toEqual({ key: "title" });
    });
    problem.title.set("TestProblem");
    await problem.saveAsMaster().catch((e) => {
      expect(e.message).toBe("Ett fält saknas.");
      expect(e.code).toBe(CODE.RequiredField);
      expect(e.meta).toEqual({ key: "n" });
    });
    problem.north.set(100);
    await problem.saveAsMaster().catch((e) => {
      expect(e.message).toBe("Ett fält saknas.");
      expect(e.code).toBe(CODE.RequiredField);
      expect(e.meta).toEqual({ key: "s" });
    });
    problem.south.set(200);
    await problem.saveAsMaster().catch((e) => {
      expect(e.message).toBe("Ett fält saknas.");
      expect(e.code).toBe(CODE.RequiredField);
      expect(e.meta).toEqual({ key: "e" });
    });
    problem.east.set(300);
    await problem.saveAsMaster().catch((e) => {
      expect(e.message).toBe("Ett fält saknas.");
      expect(e.code).toBe(CODE.RequiredField);
      expect(e.meta).toEqual({ key: "w" });
    });
    problem.west.set(500);
    await problem.saveAsMaster().catch((e) => {
      expect(e.message).toBe("Ett fält saknas.");
      expect(e.code).toBe(CODE.RequiredField);
      expect(e.meta).toEqual({ key: "sol" });
    });
    problem.solution.set([0, 1, 2, 3]);
    problem.solution.append(5);
    await problem.saveAsMaster();

    const c = await Course.query().first();
    expect(c).toBeDefined();
    const ch = await c!.chapters.query().first();
    expect(ch).toBeDefined();
    let p = await ch!.problems.query().first();
    expect(p).toBeNull();

    await user.joinCourse(course);
    p = await ch!.problems.query().first();
    expect(p).toBeDefined();
  });
  //
  //
  //
  //
  //
  //
  //
  //
  //
  test("Problem access", async () => {
    const user = await Util.signUp();
    await Util.setupCourses(2);
    const courses = await Course.query().find();
    expect(courses.length).toEqual(2);

    await Promise.all(courses.map(async (c) => {
      expect(c.numberChapters.get()).toEqual(2);
      expect(c.numberUsers.get()).toEqual(0);
      const chapters = await c.chapters.query().find();
      expect(chapters.length).toEqual(2);
      await Promise.all(chapters.map(async (ch) => {
        expect(ch.numberProblems.get()).toEqual(2);
        const problems = await ch.problems.query().find();
        expect(problems.length).toEqual(0);
      }));
    }));

    await user.joinCourse(courses[0]);
    let problems = await Problem.query().find();
    expect(problems.length).toEqual(4);
    await user.joinCourse(courses[1])
    problems = await Problem.query().find();
    expect(problems.length).toEqual(8);
    await Cloud.leaveCourse(courses[0].id);
    await user.leaveCourse(courses[1]);
    problems = await Problem.query().find();
    expect(problems.length).toEqual(0);
  }, 20000);
  //
  //
  //
  //
  // answer: user, problem, sol
  //
  //
  //
  //
  //
  test("Create answer", async () => {
    const user = await Util.signUp();
    await Util.setupCourses(2);
    const course = await Course.query().first();
    expect(course).toBeDefined()
    await user.joinCourse(course!)
    const problem = await Problem.query().first();
    expect(problem).toBeDefined()
    // await user.createProgress(problem!)
  })

  test("Course slug", async () => {
    const course = Course.create();
    course.title.set("TestkursÅÄÖåäö och jag HETER")
    course.description.set("en nice kurs")
    await course.save({useMasterKey:true});
    // server creates slug....
    await sleep(500)
    await course.fetch({useMasterKey:true})
    expect(course.slug.get()).toEqual("testkursaaoaao-och-jag-heter-"+course.id);
  })
  test("Chapter slug", async () => {
    const course = await Util.createCourse()
    const chapter = Chapter.create();
    chapter.title.set("TestkursÅÄÖåäö och jag HETER")
    chapter.description.set("en nice kurs")
    chapter.course.set(course)
    await chapter.save({useMasterKey:true});
    // server creates slug....
    await sleep(500)
    await chapter.fetch({useMasterKey:true})
    expect(chapter.slug.get()).toEqual("testkursaaoaao-och-jag-heter-"+chapter.id);
  })
});
