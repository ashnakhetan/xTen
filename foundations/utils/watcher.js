"use strict";
exports.__esModule = true;
var chokidar = require("chokidar");
var child_process_1 = require("child_process");
var process = require("process");
/* only updates popup.js so far */
var cleanSafariBuildCMD = "rm ./Safari/'Shared (Extension)'/Resources/build/popup.js";
var chromiumCopyCMD = "cp ./Chromium/public/build/popup.js ./Safari/'Shared (Extension)'/Resources/build/";
var buildXcodeMacOSCMD = "xcodebuild -project ./Safari/browser-ext.xcodeproj -scheme 'browser-ext (macOS)' -configuration Release -derivedDataPath ./Safari/build";
var buildXcodeIOSCMD = "xcodebuild -project ./Safari/browser-ext.xcodeproj -scheme 'browser-ext (iOS)' -configuration Release -derivedDataPath ./Safari/build -destination 'name=iPhone 13,OS=15.4,platform=iOS Simulator'";
var runXcodeIOSCMD = "xcrun simctl install booted ./Safari/build/Build/Products/Release-iphonesimulator/browser-ext.app";
var runXcodeMacOSCMD = "open ./Safari/build/Build/Products/Release/browser-ext.app";
// Passing an "all" handler directly
var watcher = chokidar.watch(".", { cwd: 'Firefox/public/build', ignoreInitial: true });
process.stdout.write("Watching build files\n");
watcher.on('all', function (event, targetPath, stats) {
    // so far only changes in popup.js are watched
    if (targetPath === 'popup.js') {
        process.stdout.write((0, child_process_1.execSync)("echo updating build files; ".concat(cleanSafariBuildCMD, "; ").concat(chromiumCopyCMD)).toString());
        process.stdout.write("building XCode '(macOS)'\n");
        (0, child_process_1.exec)("building XCode '(macOS)'; ".concat(buildXcodeMacOSCMD), function (err, stdout, stderr) {
            if (!err) {
                process.stdout.write("running XCode build '(MacOS)'\n");
                (0, child_process_1.exec)("running XCode build '(MacOS)'; ".concat(runXcodeMacOSCMD));
            }
            else
                process.stderr.write(err.toString());
        });
        process.stdout.write("building XCode '(iOS)'\n");
        (0, child_process_1.exec)("building XCode '(iOS)'; ".concat(buildXcodeIOSCMD), function (err, stdout, stderr) {
            if (!err) {
                process.stdout.write("running XCode build '(iOS)'\n");
                (0, child_process_1.exec)("running XCode build '(iOS)'; ".concat(runXcodeIOSCMD));
            }
            else
                process.stderr.write(err.toString());
        });
        // console.log("updating build files", event, targetPath, targetPathNext);
    }
});
