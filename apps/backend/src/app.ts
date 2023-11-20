import * as express from "express";
// var express = require('express');
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as logger from "morgan";
import * as fs from "fs";
import "./sentry"
// import {CODE} from "./utils/errorcode";

// import * as os from 'os';

import server from "./rest";
import errorHandler from "./utils/error-handler";

var bodyParser = require("body-parser");
import StripeWebhook from "./integrations/stripe/webhook";
var env = require("./env");

async function start(app:express.Application){
  // log only 4xx and 5xx responses to console
  app.use(
    logger("dev", {
      skip: (req: any, res: any) => {
        return req.url.includes("password");
      },
    })
  );

  // log all requests to access.log
  app.use(
    logger("dev", {
      skip: (req, res) => {
        return req.url.includes("password");
      },
      stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
        flags: "a",
      }),
    })
  );

  app.use(cors());
  app.use(
    "/stripe-webhook",
    bodyParser.json({
      verify: (req, res, buf) => {
        req["rawBody"] = buf;
      },
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));




  await server.start().catch(e => {
    console.log("Could not start server.")
    console.error(env)
    throw e;
  });
  server.app.use(errorHandler);
  app.use("/rest", server.app);

  app.post("/stripe-webhook", async (req, res) => {
    await StripeWebhook(req)
      .then(() => res.sendStatus(200))
      .catch((e: Error) => {
        console.log(e);
        res.status(400).json(e.message);
      });
  });

  const port = env.serverPort;
  app.listen(port, async function() {
    console.log(`Server started`);
    console.log(env.printFriendly)
    import('./dash').then(dash => {
      app.use("/dash", dash.default)
    })
  });
  
}
const app = express();
start(app);
