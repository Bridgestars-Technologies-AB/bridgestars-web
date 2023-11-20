import {
  Chapter,
  Course,
  Problem,
  useAuthMock as useAuth,
} from "bidding-db-client";

export default class Util {
  static pass = (id: number = 1) => "asdASD123" + id;
  static username = (id: number = 1) => "TEST_user" + id;
  static email = (id: number = 1) => id + "email@test.test";

  static signUp(id: number = 1) {
    return useAuth().signUp(Util.username(id), Util.pass(id), Util.email(id));
  }
  static signIn(id: number = 1) {
    return useAuth().signIn(Util.username(id), Util.pass(id));
  }
  static signOut() {
    return useAuth().signOut();
  }
  static createCourse(id: number = 1) {
    const course = Course.create();
    course.title.set("course-" + id + "-title");
    course.description.set("course-" + id + "-desc");
    return course.save({ useMasterKey: true });
  }
  static createChapter(course: Course, id: number = 1) {
    const chapter = Chapter.create();
    chapter.title.set("chapter-" + id + "-title");
    chapter.description.set("chapter-" + id + "-desc");
    chapter.course.set(course);
    return chapter.save({ useMasterKey: true });
  }
  static createProblem(chapter: Chapter, id: number = 1) {
    const problem = Problem.create();
    problem.title.set("problem-" + id);
    problem.north.set(100);
    problem.south.set(100);
    problem.east.set(100);
    problem.west.set(100);
    problem.solution.set([1,2,3,4]);
    problem.chapter.set(chapter);
    return problem.save({ useMasterKey: true });
  }
  static async setupCourses(nbr: number = 1) {
    const courses = await Promise.all(
      [...Array(nbr).keys()].map(Util.createCourse),
    );
    await Promise.all(courses.map(async (course, i) => {
      // const chapters = await Promise.all([
      const chapter1 = await Util.createChapter(course, i * 10 + 1);
      const chapter2 = await Util.createChapter(course, i * 10 + 2);
      // ]);
      // return Promise.all([
      await Util.createProblem(chapter1, i * 100 + 11);
      await Util.createProblem(chapter1, i * 100 + 12);
      await Util.createProblem(chapter2, i + 100 + 21);
      await Util.createProblem(chapter2, i + 100 + 22);
      // ]);
    }));
  }
}
