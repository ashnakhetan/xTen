#!/usr/bin/env node

const { spawn } = require('child_process');

const args = process.argv.slice(2);
const repoUrl = 'https://github.com/cs210/2023-87Capital.git';
const folderName = args[0] || 'xten-app';

const installDeps = () => {
  console.log('Installing dependencies...');
  const install = spawn('npm', ['install'], { cwd: `./${folderName}` });

  install.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  install.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  install.on('close', (code) => {
    console.log(`Dependencies installed with code ${code}`);
    console.log(`Your xTen app is now ready!`);
    console.log(`Run 'cd ${folderName}' and 'npm start' to start the development server.`);
  });
};

const cloneRepo = () => {
  console.log('Cloning repository...');
  const clone = spawn('git', ['clone', repoUrl, folderName]);

  clone.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  clone.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  clone.on('close', (code) => {
    console.log(`Repository cloned with code ${code}`);
    console.log(`Setting up boilerplate for ${folderName}...`);
    const setup = spawn('npx', ['create-react-app', folderName], { cwd: `./${folderName}` });

    setup.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    setup.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    setup.on('close', (code) => {
      console.log(`Boilerplate setup with code ${code}`);
      installDeps();
    });
  });
};

cloneRepo();