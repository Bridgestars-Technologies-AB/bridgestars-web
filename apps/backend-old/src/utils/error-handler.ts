import { CODE } from "./errorcode";

export default function (err: any, req: any, res: any, next: any): void {
  let httpStatus: number = 400;
  let message = err.message;
  let code = err.code;

  switch (message) {
    case "Invalid username/password.":
      message = "Felaktigt användarnamn eller lösenord.";
      code = CODE.InvalidUsernameOrPassword;
      break;
    case "Object not found.":
      message = "Objektet kunde inte hittas.";
      break;
    default:
  }

  switch (code) {
    case CODE.InternalServerError:
    case CODE.InternalEmailSendError:
    case CODE.InternalError:
      httpStatus = 500;
      break;
    case CODE.ObjectNotFound:
      httpStatus = 404;
      break;
    case CODE.OperationForbidden:
      message = "Åtkomst nekad.";
    default:
  }

  res.status(httpStatus);

  if (!message.includes(";;") && message !== err.message) {
    message += ";;" + JSON.stringify({ original: err.message });
  }
  if (code !== err.code || message !== err.message) {
    console.log("Custom error mapping", {
      in: {
        code: err.code,
        message: err.message,
      },
      out: { code, error: message },
    });
  }
  res.json({ code, error: message });
}
