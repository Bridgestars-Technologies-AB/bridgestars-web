
var env = require("../../env")
import Stripe from "stripe";

export default new Stripe(env.stripeKey,
    { apiVersion: "2022-11-15" });

