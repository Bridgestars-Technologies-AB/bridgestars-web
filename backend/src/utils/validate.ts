import "parse/node";
import { z } from "zod";
import DbObject from "../classes/__DbObject__";
import ERROR, { CODE, failValidation } from "./fail";

export { z };

export function field(
  req: Parse.Cloud.BeforeSaveRequest,
  key: string,
  zodValidator: z.ZodType<any>,
) {
  const obj = req.object;
  if (obj.isNew() || obj.dirty(key)) {
    const data = obj.get(key);
    const res: any = zodValidator.safeParse(data);
    if (res.success) {
      obj.set(key, res.data);
    } else {
      // if(key !== "password") {
      //   let error = res.error;
      //    if (res.error.issues) error = error.issues[0];
      // console.log("validation failed for class save on class: " + obj.className, {key, data, error})
      // }
      failValidation(key, res.error);
    }
  }
}

export async function refExists(
  req: Parse.Cloud.BeforeSaveRequest,
  key: string,
  targetClass: DbObject,
) {
  const obj = req.object;
  if (obj.isNew() || obj.dirty(key)) {
    const data = obj.get(key);
    return new Parse.Query(targetClass.className)
      .include("objectId") // skip all other fields
      .get(data, { useMasterKey: true })
      .catch(() =>
        failValidation(
          key,
          CODE.InvalidPointer,
          `Referensen pekar inte på ett existerade objekt.`,
        )
      );
  }
}

export function immutable(
  req: Parse.Cloud.BeforeSaveRequest,
  key: string,
) {
  const obj = req.object;
  if (!obj.isNew()) {
    if (obj.dirty(key)) {
      if (obj.get(key) == req.original!.get(key)) return;
      failValidation(key, CODE.ImmutableField, `Fältet kan inte ändras`);
    }
  }
}

export function masterOnly(req: Parse.Cloud.BeforeSaveRequest, key: string) {
  if (req.object.dirty(key)) {
    if(req.object.isNew() && req.object.get(key) === undefined) return;
    if (!req.master) {
      failValidation(
        key,
        CODE.Unauthorized,
        "Endast admin kan ändra detta fält",
      );
    }
  }
}

export function required(
  req: Parse.Cloud.BeforeSaveRequest,
  key: string,
) {
  const obj = req.object;
  if (obj.get(key) === undefined) {
    failValidation(key, CODE.RequiredField, "Ett fält saknas");
  }
}

export function maxDiff(
  req: Parse.Cloud.BeforeSaveRequest,
  key: string,
  maxDiff: number,
) {
  if (req.object.isNew()) return;
  const diff = Math.abs(
    ((req.object.get(key) as number) - req.original!.get(key)) as number,
  );
  if (diff > maxDiff) {
    failValidation(
      key,
      CODE.FieldValidationError,
      `Fältet kan ändras med max ${maxDiff}`,
    );
  }
}
