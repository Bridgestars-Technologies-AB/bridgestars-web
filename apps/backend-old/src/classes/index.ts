// kanske lite långsamt att göra såhär, vi kan generera detta vid build istället
// eller så klart skriva in själva om vi lägger till en fil men det är ju tråkigt
// var fs = require('fs');
// const docker = process.env.ENV != "shell";
// var files = fs.readdirSync(`./${docker ? "":"build/"}classes/`);
// Array(...files).filter(x => !x.includes('index')).forEach(p => require(`./${p}`))
import "./__DbObject__"
import "./_Installation"
import "./_User"
import "./Answer"
import "./Chapter"
import "./Course"
import "./file"
import "./Problem"
import "./Progress"
import "./UserInfo"

