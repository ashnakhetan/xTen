#!/bin/bash

# Run npm install
echo "Running npm install in @xten folder..."
pnpm install

# Run npm link
echo "Running npm link in @xten folder..."
sudo npm link

# Navigate to the meet-normal-bedbug folder
cd ../meet-normal-bedbug

# Run npm link to connect the package
echo "Running npm link to connect @xten package in meet-normal-bedbug folder..."
pnpm link

# Confirm that the package is linked and ready to use
echo "Package linked and ready to use in the extension."