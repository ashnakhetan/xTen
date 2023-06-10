# Welcome to xTen!

## Steps
    1. Run `pnpm install` in the plasmo project.
    2. Run `pnpm dev` in the plasmo project.
    3. Add the build folder as you would add any extension in chrome (we're literally only adding the extension here!)

If you look into the console of the extension you should see the test message show up!

## Later steps
As we start adding packages to @xten, we're going to start getting our own dependencies so we will have to run `pnpm install` in that folder as well but for now we have nothing.

## Uploading your Extension to Chrome

1. Head over to chrome://extensions and enable Developer Mode.
2. Click on "Load Unpacked" and navigate to your extension's build/chrome-mv3-dev (or build/chrome-mv3-prod) directory.
3. To see your popup, click on the puzzle piece icon on the Chrome toolbar, and click on your extension.


## OpenAI notice
Code added is server side so make sure to never ship any openai configs with it – devs would likely want to have a way for users to input their own key in and use that.
