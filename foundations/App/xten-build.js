#!/usr/bin/env node

// Must be run from App or the root of the project
const { Command } = require('commander');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const program = new Command();

program
  .version('1.0.0')
  .description('Tool to build xten browser extensions');

program
  .command('build')
  .alias('b', 'build')
  .description('Builds the project and spinds up watcher')
  .action(() => {

    // First check if the command is being run from the App directory
    const appDir = path.basename(process.cwd());
    if (appDir !== 'App' && !fs.existsSync(path.join(process.cwd(), 'package.json'))) {
      console.error('This command must be run from the App directory');
      process.exit(1);
    }

    console.log('Building the project...');

    // Install dependencies, in case some were modified after the initial 
    // boilerplate install
    console.log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Run the build script from package.json
    console.log('Running build script...');
    execSync('npm run build', { stdio: 'inherit' });

    console.log('Project built successfully!');
  });

program.parse(process.argv);