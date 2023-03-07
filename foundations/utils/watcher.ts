import * as chokidar from 'chokidar';
import { execSync, exec } from "child_process";
import * as process from "process";

/* only updates popup.js so far */
const cleanSafariBuildCMD = "rm ./Safari/'Shared (Extension)'/Resources/build/popup.js";
const chromiumCopyCMD = "cp ./Chromium/public/build/popup.js ./Safari/'Shared (Extension)'/Resources/build/";

const buildXcodeMacOSCMD = "xcodebuild -project ./Safari/browser-ext.xcodeproj -scheme 'browser-ext (macOS)' -configuration Release -derivedDataPath ./Safari/build";
const buildXcodeIOSCMD = "xcodebuild -project ./Safari/browser-ext.xcodeproj -scheme 'browser-ext (iOS)' -configuration Release -derivedDataPath ./Safari/build -destination 'name=iPhone 13,OS=15.4,platform=iOS Simulator'";
const runXcodeIOSCMD = "xcrun simctl install booted ./Safari/build/Build/Products/Release-iphonesimulator/browser-ext.app";
const runXcodeMacOSCMD = "open ./Safari/build/Build/Products/Release/browser-ext.app";

// Passing an "all" handler directly
const watcher = chokidar.watch(".", { cwd: 'Firefox/public/build',  ignoreInitial: true, });
process.stdout.write(`Watching build files\n`)
watcher.on('all', ( event: any, targetPath: any, stats: any) => {
  // so far only changes in popup.js are watched
  if (targetPath === 'popup.js') {
    process.stdout.write(execSync(`echo updating build files; ${cleanSafariBuildCMD}; ${chromiumCopyCMD}`).toString());

    process.stdout.write(`building XCode '(macOS)'\n`);
    exec(`building XCode '(macOS)'; ${buildXcodeMacOSCMD}`, (err, stdout, stderr) => {
      if (!err) {
        process.stdout.write(`running XCode build '(MacOS)'\n`);
        exec(`running XCode build '(MacOS)'; ${runXcodeMacOSCMD}`);
      }
      else process.stderr.write(err.toString());
    });

    process.stdout.write(`building XCode '(iOS)'\n`);
    exec(`building XCode '(iOS)'; ${buildXcodeIOSCMD}`, (err, stdout, stderr) => {
      if (!err) {
        process.stdout.write(`running XCode build '(iOS)'\n`);
        exec(`running XCode build '(iOS)'; ${runXcodeIOSCMD}`);
      }
      else process.stderr.write(err.toString());
    });
    // console.log("updating build files", event, targetPath, targetPathNext);
  }
});