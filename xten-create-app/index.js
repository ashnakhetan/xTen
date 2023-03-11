#!/usr/bin/env node

const figlet = require("figlet");
const { Command } = require("commander");

/* What is our figlet usage policy
  it looks cool so I'm using it here */

// console.log(figlet.textSync("xTen"));
console.log(figlet.textSync("xten-create-app"));

// Switching to commander to follow Ruslan's example
const program = new Command();
program
  .version("1.0.0")
  .description("CLI command to create xTen browser extensions")
  .option("-c, --create-xten-app", "Create browser extension")
  .argument("[project-name]", "project name", "xten-app")
  .parse(process.argv);

const options = program.opts();

// What other options should we have?
if (options.createXtenApp) {
  const { spawn } = require("child_process");
  const repoUrl = "https://github.com/cs210/2023-87Capital.git";
  let folderName = program.args[0];

  if (folderName === undefined) {
    folderName = "xten-app";
  }

// What dependencies do we require?
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

  // Gotta switch repos and update package.json too
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
      const setup = spawn("npx", ["create-react-app", folderName], {
        cwd: `./${folderName}`,
      });
  
      setup.stdout.on("data", (data) => {
        console.log(data.toString());
      });
  
      setup.stderr.on("data", (data) => {
        console.error(data.toString());
      });
  
      setup.on("close", (code) => {
        console.log(`Boilerplate setup with code ${code}`);
        installDeps();
      });
    });
  };
cloneRepo();
} else {
    console.log("Invalid command. Please use the --create-xten-app option.");
}