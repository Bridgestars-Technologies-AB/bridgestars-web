
const Parse = require("parse")
globalThis.Parse = Parse;

const initializeParse = (serverURL, applicationId) => {
  Parse.serverURL = serverURL;
  Parse.initialize(applicationId);
  //Parse.enableLocalDatastore();
};

initializeParse(
  'https://aws.lb.bridgestars.net/rest',
  'k4PTFS2R8tSYoZC8UNXzvplbZ38jOmViOkJxJEyE'
);
