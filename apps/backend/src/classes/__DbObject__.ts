type BeforeSaveRequest = Parse.Cloud.BeforeSaveRequest<Parse.Object<Parse.Attributes>>;
type AfterSaveRequest = Parse.Cloud.AfterSaveRequest<Parse.Object<Parse.Attributes>>;
type BeforeDeleteRequest = Parse.Cloud.BeforeDeleteRequest<Parse.Object<Parse.Attributes>>;
type AfterDeleteRequest = Parse.Cloud.AfterDeleteRequest<Parse.Object<Parse.Attributes>>;
type BeforeFindRequest = Parse.Cloud.BeforeFindRequest<Parse.Object<Parse.Attributes>>;
type Query = Parse.Query<Parse.Object<Parse.Attributes>>;

import * as Validate from '../utils/validate';

type Schema = {className:string, fields: {}, indexes: {}, classLevelPermissions: {}}

abstract class DbObject {
  static classes : DbObject[] = []
  className: any;
  triggerName: any;
  schema : Schema;

  abstract validate(req: BeforeSaveRequest, obj: Parse.Object): Promise<void> | void;
  abstract beforeSave(req: BeforeSaveRequest, obj: Parse.Object): Promise<void> | void;
  abstract afterSave(req: AfterSaveRequest, obj: Parse.Object): Promise<void> | void;
  abstract beforeDelete(req: BeforeDeleteRequest, obj: Parse.Object): Promise<void> | void;
  abstract afterDelete(req: AfterDeleteRequest, obj: Parse.Object): Promise<void> | void;

  async beforeFind(req : BeforeFindRequest): Promise<Query> { return req.query; };
  

  //constructor
  constructor(schema : Schema) {
    this.schema = schema;
    this.className = schema.className;
    this.triggerName = schema.className;
    if(schema.className == "_User") this.triggerName = Parse.User;
    DbObject.classes.push(this)
  }
  register(){
    console.log("info: Hooks registered: " + this.schema.className)
    Parse.Cloud.beforeSave(this.triggerName, async (req) => {
      if (req.master && req.context.noValidation) return; //PREVENT LOOP
      Validate.immutable(req, 'ACL') 
      await this.validate(req, req.object);
      return this.beforeSave(req, req.object);
    });
    Parse.Cloud.afterSave(this.triggerName, async (req) => {
      if (req.master && req.context.noValidation) return; //PREVENT LOOP
      return this.afterSave(req, req.object);
    });
    Parse.Cloud.beforeDelete(this.triggerName, async (req) => {
      return this.beforeDelete(req, req.object);
    });
    Parse.Cloud.afterDelete(this.triggerName, async (req) => {
      return this.afterDelete(req, req.object);
    });
    Parse.Cloud.beforeFind(this.triggerName, async (req) => {
      return this.beforeFind(req);
    });
  }
  
}

export { BeforeSaveRequest, AfterSaveRequest, BeforeDeleteRequest, AfterDeleteRequest, BeforeFindRequest, Query }; 

export default DbObject;
