// import Parse from "parse/dist/parse.min.js";
//
// const initializeParse = (serverURL, applicationId) => {
//   Parse.serverURL = serverURL;
//   Parse.initialize(applicationId);
//   //Parse.enableLocalDatastore();
// };
//
// initializeParse(
//   // 'https://aws.lb.bridgestars.net/rest',
//   "http://localhost:1337/rest",
//   "76SGU2S6Sixv78YNTLfXVoRhq794D8o2",
// );
import * as DB from "bridgestars-db-client";
DB.useLocalTestServer()
const Parse = DB.DatabasePrimitive;
export { Parse };
