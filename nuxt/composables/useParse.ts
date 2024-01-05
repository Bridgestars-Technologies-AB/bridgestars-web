
import Parse from 'parse/dist/parse.min.js';

const initializeParse = (serverURL, applicationId) => {
  Parse.serverURL = serverURL;
  Parse.initialize(applicationId);
  //Parse.enableLocalDatastore();
};

// initializeParse(
//   'http://localhost:1337/rest',
//   'abc123'
// );
initializeParse(
  'https://bridgestars-legacy.fly.dev/rest',
  'tv4DV5aBdGXcG8y9hiT85s6R2qKTwEhCpcA8Q'
);

export {Parse};
