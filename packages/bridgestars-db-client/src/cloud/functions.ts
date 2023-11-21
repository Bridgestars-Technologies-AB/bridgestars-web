// import { DatabasePrimitive } from "parse-sdk-ts";
import { Cloud } from "parse-sdk-ts";
import { SubscriptionPlan } from "../types/products";
import { Portal } from "../types/portal";


export const joinCourse = Cloud.declare<
  (courseId: string) => void
>(
  "joinCourse",
  ["courseId"],
);

export const leaveCourse = Cloud.declare<
  (courseId: string) => void
>(
  "leaveCourse",
  ["courseId"],
);

export const managePlan = Cloud.declare<
  (return_url: string) => Portal
>(
  "manage-plan",
  ["return_url"],
);

export const subscribeToPlan = Cloud.declare<
  (plan: SubscriptionPlan, success_url: string, cancel_url: string) => Portal
>(
  "subscribe-to-plan",
  ["plan", "success_url", "cancel_url"],
);
