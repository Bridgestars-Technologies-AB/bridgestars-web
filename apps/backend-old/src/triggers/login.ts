// import { removeAllAssociatedSessions } from "../utils/roles";
import UserInfo from "../utils/userinfo";
import { removeAllAssociatedSessions } from "../utils/roles";


Parse.Cloud.beforeLogin(async (req) => {
  var username = req.object.getUsername();
  if (username == "admin") {
    await removeAllAssociatedSessions(req.object);
  }
});

Parse.Cloud.afterLogin(async (req) => {
  await UserInfo.setLastLogin(req.object);
})
