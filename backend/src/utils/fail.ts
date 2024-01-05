import { CODE } from "./errorcode";

type zError = {
  code: string;
  message: string;
  type: string;
  issues?: [{ code: string; message: string; type: string }];
};

export default function fail(
  message: string,
  code: number | CODE,
  options?: { meta?: string|object },
) {
  if (!message.includes(";;") && !message.endsWith(".")) message += ".";
  if(typeof options?.meta === "string") options.meta = {message: options.meta};
  if(typeof options?.meta === "object") options.meta = JSON.stringify(options.meta);
  if (options?.meta) message += ";;" + options.meta;
  throw new Parse.Error(code as number, message);
}

function failValidation(
  key: string,
  error: zError | CODE,
  message: string = "",
) {
  if (typeof error === "number") {
    const info = { key: key };
    if (!message.endsWith(".")) message += ".";
    fail(message, error, { meta: info });
  } else {
    if (error.issues) error = error.issues[0];
    const info = { key, ...error };
    delete info["inclusive"];
    delete info["exact"];
    delete info["path"];
    delete info["validation"];
    fail(
      "Ett fält kunde inte sparas.",
      CODE.FieldValidationError,
      { meta: info },
    );
  }
}
export { CODE, failValidation };
