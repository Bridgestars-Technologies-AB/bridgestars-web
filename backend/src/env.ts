import "dotenv/config";

let envs: any = process.env;

// when passing --env-file to docker, it does not escape quotes
if (envs.DB && !envs.DB.includes("prod")) {
  Object.keys(envs).forEach((key: string) => {
    envs[key] = envs[key].replace(/[\"\']/g, "");
  });
}

let {
  ENV,
  DB_USER,
  DB_PASS,
  MONGO_URL,
  APP_ID,
  MASTERKEY,
  READONLY_MASTERKEY,
  DASH_WRITE_PASS,
  DASH_READONLY_PASS,
  DB,
  LOCAL,
  SERVER_PORT,
  STRIPE_KEY,
  STRIPE_WEBHOOK_SECRET,
} = envs;

SERVER_PORT = SERVER_PORT || "1337";
DB = DB || "prod";
ENV = ENV || "docker";

const env = {
  databaseURI:
    `mongodb+srv://${DB_USER}:${DB_PASS}@${MONGO_URL}/${DB}?retryWrites=true&w=majority`,
  appId: APP_ID,
  appName: "bridgestars",
  masterKey: MASTERKEY,
  readOnlyMasterKey: READONLY_MASTERKEY,
  masterKeyIps: [ // for 6.0.0
    // serverAddress || '::1',
    "::1", // localhost
    "0.0.0.0/0", // could not get serveraddress to work, allowing all
  ],
  serverURL: `http://localhost:${SERVER_PORT}/rest`,
  publicServerURL: LOCAL
    ? `http://localhost:${SERVER_PORT}/rest`
    : `https://bridgestars-legacy${DB == "dev" ? "-dev" : ""
    }.fly.dev/rest`,
  serverPort: SERVER_PORT,
  dashWritePass: DASH_WRITE_PASS,
  dashReadOnlyPass: DASH_READONLY_PASS,
  DB: DB,
  stripeKey: STRIPE_KEY,
  stripeWebookSecret: STRIPE_WEBHOOK_SECRET,
};
env["printFriendly"] = {
  env: ENV,
  local: LOCAL,
  db: DB,
  db_user: DB_USER,
  public_url: env.publicServerURL,
  private_url: env.serverURL,
};

if (!DB_USER || !DB_PASS) {
  console.log(env);
  throw new Error(
    "Will not be able to connect to database without credentials.",
  );
}
//disable annoying print related to S3-storage
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = "1";

// export default env;
module.exports = env;
