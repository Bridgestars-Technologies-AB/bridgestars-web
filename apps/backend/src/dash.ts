const ParseDashboard = require("parse-dashboard");
var env = require("./env");
import columnPreference from "./column-pref";

const config = {
  apps: [
    {
      serverURL: env.publicServerURL,
      appId: env.appId,
      masterKey: env.masterKey,
      readOnlyMasterKey: env.readOnlyMasterKey,
      appName: env.appName,
      supportedPushLocales: ["en"],
      production: env.DB == "prod",
      iconName: "SuitClubs.svg",
      columnPreference
    },
  ],
  users: [
    {
      user: "master",
      pass: env.dashWritePass,
    },
    {
      user: "moderator",
      readOnly: true,
      pass: env.dashReadOnlyPass,
    },
  ],
  iconsFolder: "icons",
};

const options = { 
  allowInsecureHTTP: true,
  // does not need to be protected, just for syncing between load balanced servers
  cookieSessionSecret: 'kAgzPDZRrnI1JMsRSYxBrQcaad7BYhGa'
}; //process.env.DEV };

const dashboard = new ParseDashboard(
  config,
  options,
);

if(env.DB == "test"){
  console.log({
    info: "(TESTING) Dashboard login credentials",
    users:config.users,
    dashboardURL: env.publicServerURL.split(env.serverPort)[0] + env.serverPort+"/dash/login",
  });
}

export default dashboard;
