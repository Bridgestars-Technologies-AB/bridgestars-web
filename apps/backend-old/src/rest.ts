var morgan = require("morgan");

const ParseServer = require("parse-server").ParseServer;
var env = require('./env')
import emailAdapter from "./adapters/mail-adapter";
import fsAdapter from "./adapters/fs-adapter";
import schema from "./schema";

//import cacheAdapter from "../adapters/cache-adapter";


const docker = process.env.ENV != "shell";
const cloudEntry = `./${docker ? "":"build/"}cloud.js`;

//check file exists
import * as fs from "fs";
if (!fs.existsSync(cloudEntry)) {
  console.error("cloud entry not found: " + cloudEntry);
  console.log("docker: " + docker);
  console.log("env: " + process.env.ENV);
  throw new Error("cloud entry not found: " + cloudEntry);
}
const api =  new ParseServer({
  databaseURI: env.databaseURI,
  cloud: cloudEntry,
  appId: env.appId,
  appName: env.appName,
  masterKey: env.masterKey,
  masterKeyIps: env.masterKeyIps,
  readOnlyMasterKey: env.readOnlyMasterKey,
  serverURL: env.serverURL,
  publicServerURL: env.publicServerURL,
  directAccess: true, // server handle request directly, does not go via http to loadbalancer 


  logger: morgan("dev"),
  logsFolder: docker ? "/data/logs" : "./logs",
  enableExpressErrorHandler: true,

  schema: schema,
  allowCustomObjectId: false,
  allowClientClassCreation: false,
  allowExpiredAuthDataToken: false,

  filesAdapter: fsAdapter,
  // cacheAdapter: redisCache,
  emailAdapter: emailAdapter,

  fileUpload: {
    enableForPublic: false,
    enableForAnonymousUser: false,
    enableForAuthenticatedUser: true,
  },
  verifyUserEmails: false,
  sessionLength: 3600 * 24 * 30, // en månad
  emailVerifyTokenValidityDuration: 24 * 60 * 60, // 24 timmar
  preventLoginWithUnverifiedEmail: false,
  enforcePrivateUsers: false,
  accountLockout: {
    threshold: 15, //threshold policy setting determines the number of failed sign-in attempts that will cause a user account to be locked. Set it to an integer value greater than 0 and less than 1000
    duration: 2, // duration policy setting determines the number of minutes that a locked-out account remains locked out before automatically becoming unlocked. Set it to a value greater than 0 and less than 100000.
    unlockOnPasswordReset: true
  },
  passwordPolicy: {
    //validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    //8 tecken, siffra, liten bokstav, stor bokstav
    //doNotAllowUsername: true,
    resetTokenValidityDuration: 24 * 60 * 60, //24 timmar
  },
  // customPages: {
  //     passwordResetSuccess: "http://yourapp.com/passwordResetSuccess",
  //     verifyEmailSuccess: "http://yourapp.com/verifyEmailSuccess",
  //     parseFrameURL: "http://yourapp.com/parseFrameURL",
  //     linkSendSuccess: "http://yourapp.com/linkSendSuccess",
  //     linkSendFail: "http://yourapp.com/linkSendFail",
  //     invalidLink: "http://yourapp.com/invalidLink",
  //     invalidVerificationLink: "http://yourapp.com/invalidVerificationLink",
  //     choosePassword: "http://yourapp.com/choosePassword"
  // },
  middleware: function(params: any) {
    console.log(params);
  },
});

export default api;
