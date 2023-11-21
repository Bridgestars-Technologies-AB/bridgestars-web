// import { DatabasePrimitive } from "parse-sdk-ts";
import { Cloud } from "parse-sdk-ts";
export const joinCourse = Cloud.declare("joinCourse", ["courseId"]);
export const leaveCourse = Cloud.declare("leaveCourse", ["courseId"]);
export const managePlan = Cloud.declare("manage-plan", ["return_url"]);
export const subscribeToPlan = Cloud.declare("subscribe-to-plan", ["plan", "success_url", "cancel_url"]);
