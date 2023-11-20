import './classes'
var env = require('./env')
import DbObject from './classes/__DbObject__'
console.log(`Loaded ${DbObject.classes.length} classes`)

// the "strict" policy is for dev use and will automatically remove all 
// data which is not defined in a schema
const strictPolicy = true// Boolean(env.DB === "test")
console.log("strictPolicy: " + strictPolicy)

export default {
    definitions: DbObject.classes.map((x:any) => x.schema),
    // If set to `true`, the Parse Server API for schema changes is disabled and schema 
    // changes are only possible by redeployingParse Server with a new schema definition
    lockSchemas: !strictPolicy,
    // If set to `true`, Parse Server will automatically delete non-defined classes from
    // the database; internal classes like `User` or `Role` are never deleted.
    strict: true,
    // If set to `true`, a field type change will cause the field including its data to be
    // deleted from the database, and then a new field to be created with the new type
    recreateModifiedFields: strictPolicy,
    // If set to `true`, Parse Server will automatically delete non-defined class fields;
    // internal fields in classes like User or Role are never deleted.
    deleteExtraFields: strictPolicy,
    // afterMigration: async () => {
    //   const problems = await new Parse.Query("Problem").findAll()
    //   for(const p of problems){
    //     const oldSol = p.get("sol")
    //     p.set("sol", oldSol.map(x => x.b))
    //     p.set("com", oldSol.map(x => x.d))
    //   console.log(p)
    //   throw new Error("stop")
    //
    //   }
    //
    // }
}

async function createIndexes(parseServer:any){
    // let adapter = parseServer.config.databaseController.adapter;
    // 
    // const schema = {
    //   fields: {
    //     uuid: { type: 'String' }
    //   },
    // };
    // 
    // const versionedSchema = {
    //   fields: {
    //     uuid: { type: 'String' },
    //     entityId: { type: 'String' },
    //     effectiveDate: { type: 'Date' }
    //   },
    // };
    // 
    // await adapter.ensureUniqueness('Patient', versionedSchema, ['uuid'])
    // .catch((error: any) => console.log(error));
    // await adapter.ensureIndex('Patient', versionedSchema, ['entityId'], 'Patient'+indexEntityIdPostfix, false)
    // .catch((error: any) => console.log(error));
    
    //Because of way ParseCareKit handles this class, comment out these checks
    /*
    await adapter.ensureUniqueness('OutcomeValue', schema, ['uuid'])
    .catch(error => console.log(error));
    
    await adapter.ensureUniqueness('Note', schema, ['uuid'])
    .catch(error => console.log(error));
    */
    
}
