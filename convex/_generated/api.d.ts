/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as analyzeForm from "../analyzeForm.js";
import type * as athletes from "../athletes.js";
import type * as auth from "../auth.js";
import type * as coachingMessages from "../coachingMessages.js";
import type * as dailyLogs from "../dailyLogs.js";
import type * as formAnalysis from "../formAnalysis.js";
import type * as frameSummaries from "../frameSummaries.js";
import type * as http from "../http.js";
import type * as nutrition from "../nutrition.js";
import type * as reps from "../reps.js";
import type * as sessions from "../sessions.js";
import type * as sleep from "../sleep.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  analyzeForm: typeof analyzeForm;
  athletes: typeof athletes;
  auth: typeof auth;
  coachingMessages: typeof coachingMessages;
  dailyLogs: typeof dailyLogs;
  formAnalysis: typeof formAnalysis;
  frameSummaries: typeof frameSummaries;
  http: typeof http;
  nutrition: typeof nutrition;
  reps: typeof reps;
  sessions: typeof sessions;
  sleep: typeof sleep;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
