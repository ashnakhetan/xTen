var figlet = require("figlet");
console.log(figlet.textSync("xTen[tion]"));
var Command = require("commander").Command;
//add the following line
var program = new Command();
program
    .version("0.0.1")
    .description("The only CLI you'll need for building browser extentions.")
    .option("create-xten-app", "Create browser ext")
    .argument("project-name", "project name")
    .parse(process.argv);
var options = program.opts();

console.log(options);
console.log(program.args);
if (options.I) {
    console.log("Creating project...⚙️");
    setTimeout(function () {
        console.log('Opening project 🚀');
    }, 5000);
}


var program2 = new Command();
program2
    .version("0.0.1")
    .description("The only CLI you'll need for building browser extentions.")
    .option("-D, --dev", "runs in dev mode")
    .parse(process.argv);
var options2 = program2.opts();

console.log(options2);
console.log(program2.args);
if (options2.I) {
    console.log("Creating project...⚙️");
    setTimeout(function () {
        console.log('Opening project 🚀');
    }, 5000);
}
