import Course from "../classes/Course";
import fail, { CODE } from "../utils/fail";
import { addRoleAsync } from "../utils/roles";

// på clienten:
//    await joinCourse(course.id) 
// omvandlas till => 
//    Parse.Cloud.run("joinCourse", {courseId: course.id})
//
// eller
//    import * as DB from "parse-sdk-ts"
//    DB.Primitive.Cloud.run("joinCourse", {courseId: course.id})

Parse.Cloud.define("joinCourse", async (req) => {
  if (!req.user) fail("Åtkomst nekad. Inloggning krävs.", CODE.Unauthorized);
  if (!req.params.courseId) fail("Ingen kurs angiven", CODE.MissingArgument);

  // check if user has access to join the course

  const course = await new Parse.Query(Course.className).get(
    req.params.courseId,
    { useMasterKey: true },
  );
  // course.users.query()
  const hasCourse = await course.relation("users")
    .query()
    .equalTo("objectId", req.user.id)
    .first({ useMasterKey: true });
  if (hasCourse) return;

  course.relation("users").add(req.user);
  course.increment("n_user", 1);
  await course.save(null, { useMasterKey: true, context:{noValidation:true }});
  await addRoleAsync("course-" + course.id, req.user);
});
