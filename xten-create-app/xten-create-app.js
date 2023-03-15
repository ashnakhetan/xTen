#!/usr/bin/env node

const figlet = require("figlet");
const { Command } = require("commander");
const packageJson = require("./package.json");

/* What is our figlet usage policy
  it looks cool so I'm using it here */
console.log(figlet.textSync("xten"));

const program = new Command();
program
  .version("1.0.0")
  .description("CLI command to create xTen browser extensions")
  .option("-c, --create-xten-app", "Create browser extension")
  .argument("[project-name]", "project name", "xten-app")
  .parse(process.argv);

const options = program.opts();

if (options.createXtenApp) {
  const { spawn } = require("child_process");
  // Need updated foundations repo
  const repoUrl = "https://github.com/cs210/2023-87Capital.git";
  let folderName = program.args[0];

  if (typeof folderName === 'undefined') {
    console.error('Please specify the App directory:');
    console.log();
    console.log('<app-directory>');
    console.log();
    console.log('For example:');
    console.log('my-xten-app');
    console.log();
    process.exit(1);
  }

  // Install dependencies
  const installDeps = () => {
    console.log("Installing dependencies...");
    
    const install = spawn("npm", ["install"], { cwd: `./${folderName}` });

    install.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    install.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    install.on("close", (code) => {
      console.log(`Dependencies installed with code ${code}`);
      console.log(`Your xTen app is now ready!`);
      console.log(
        `Run 'cd ${folderName}' and 'npm start' to start the development server.`
      );
    });
  };


  // TODO: switch repos and update package.json too
  const cloneRepo = () => {
    console.log("Cloning repository...");
    const clone = spawn("git", ["clone", repoUrl, folderName]);
    clone.stdout.on("data", (data) => {
      console.log(data.toString());
    });
  
    clone.stderr.on("data", (data) => {
      console.error(data.toString());
    });
  
    clone.on("close", (code) => {
      console.log(`Repository cloned with code ${code}`);
      console.log(`Setting up boilerplate for ${folderName}...`);
      installDeps();
    });
  };
cloneRepo();
} else {
    console.log("Invalid command. Please use the --create-xten-app option.");
}