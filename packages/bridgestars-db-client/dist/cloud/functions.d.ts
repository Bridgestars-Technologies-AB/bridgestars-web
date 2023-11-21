import { SubscriptionPlan } from "../types/products";
import { Portal } from "../types/portal";
export declare const joinCourse: (courseId: string) => Promise<void>;
export declare const leaveCourse: (courseId: string) => Promise<void>;
export declare const managePlan: (return_url: string) => Promise<Portal>;
export declare const subscribeToPlan: (plan: SubscriptionPlan, success_url: string, cancel_url: string) => Promise<Portal>;
