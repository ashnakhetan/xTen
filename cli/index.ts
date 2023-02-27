const figlet = require("figlet");

console.log(figlet.textSync("xTen"));

const { Command } = require("commander");

//add the following line
const program = new Command();
program
  .version("0.0.1")
  .description("The only CLI you'll need for building browser extentions.")
  .option("create-xten-app", "Create browser ext")
  .option("-D, --dev", "runs in dev mode")
  .parse(process.argv);

const options = program.opts();
console.log(options);
if (options.I) {
  console.log("Creating project...⚙️");
  setTimeout(() => {
    console.log('Opening project 🚀')
  }, 5000)
}