// this is the parse.cloud entry point
//require('./classes/index')
import './classes'
import DbObject from './classes/__DbObject__'
// important that these are registered after schemas are loaded
DbObject.classes.forEach((c:DbObject) => c.register())

require('./functions')
require('./triggers')
