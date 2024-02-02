
import { stripRoleAsync } from "../utils/roles"
import Course from "../classes/Course"
import fail, {CODE} from "../utils/fail"

Parse.Cloud.define("leaveCourse", async (req) => {
  if(!req.user) fail("Åtkomst nekad. Inloggning krävs.", CODE.Unauthorized)
  if(!req.params.courseId) fail("Ingen kurs angiven", CODE.MissingArgument)

  // check if user has access to join the course

  return new Parse.Query(Course.className).get(req.params.courseId, {useMasterKey: true}).then(async course => {
    const hasCourse = await course.relation("users").query().equalTo("objectId", req.user.id).first({useMasterKey:true})
    if(!hasCourse) return;
    course.relation("users").remove(req.user)
    course.decrement("n_user", 1)
    await course.save(null, {useMasterKey:true, context:{noValidation:true}})
    await stripRoleAsync("course-"+course.id, req.user)
  })
})
