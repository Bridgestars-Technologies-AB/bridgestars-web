import * as cloud from "parse-server/lib/cloud-code/Parse.Cloud.js";
import UserInfo from "./userinfo";


async function sendOnce(user: Parse.User, name: string) {
  return UserInfo.get(user).then(async (info) => {
    if (!info) return;
    const emails = info.get("emails_sent");
    if (!emails?.includes(name)) {
      await cloud.sendEmail({
        templateName: name,
        user: user,
      });
      info.addUnique("emails_sent", name);
      await info.save(null, {
        useMasterKey: true,
      });
    }
  });
}

export class Mailer {
  static async sendWelcomeEmail(user: Parse.User) {
    if(user.getEmail()?.includes("@test.test")) return;
    return sendOnce(user, "welcome");
  }
  static async sendPasswordResetEmail(user:Parse.User){
    await cloud.sendEmail({
      templateName: "passwordReset",
      user: user,
    });
  }
  static async sendEmailVerificationEmail(user:Parse.User){
    return sendOnce(user, "verification");
  }
}
