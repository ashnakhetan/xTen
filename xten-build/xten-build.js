#!/usr/bin/env node

const { Command } = require('commander');
const { execSync } = require('child_process');
const esbuild = require('esbuild');

const program = new Command();

program
  .version('1.0.0')
  .description('CLI tool to build xten project');

program
  .command('xten-build')
  .alias('xb')
  .description('Build the project')
  .action(() => {
    console.log('Building the project...');

    // Install dependencies
    console.log('Installing dependencies...');
    execSync('npm install --only=prod', { stdio: 'inherit' });

    // Run the esbuild build function
    esbuild
      .build({
        entryPoints: [
          './src/background.ts',
          './src/content.ts',
          './src/popup.tsx',
          './src/injected.ts',
        ],
        bundle: true,
        minify: true,
        sourcemap: process.env.NODE_ENV !== 'production',
        watch: false,
        target: ['chrome110', 'firefox57'],
        outdir: '../Firefox/public/build',
        define: {
          'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
        },
      })
      .then(() => {
        console.log('Project built successfully!');
      })
      .catch((error) => {
        console.error(`Build failed: ${error}`);
        process.exit(1);
      });
  });

program.parse(process.argv);