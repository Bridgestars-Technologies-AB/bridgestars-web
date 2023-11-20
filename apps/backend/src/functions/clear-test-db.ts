var env = require("../env");

Parse.Cloud.define("clearTestDB", async (req) => {
  if(env.DB != "test") throw new Error("Not in testing environment")
  if(!env.databaseURI.includes("/test")) throw new Error("Not using testing database") //same as above


  const schemas = await Parse.Schema.all()
  await Promise.all(schemas.map(s => new Parse.Schema(s.className).purge()))

})
