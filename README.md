We are using pnpm instead of npm and yarn so install it.\
This is a sample project that links the @xten package into a plasmo project

## Steps

Run `pnpm install` in the plasmo project.\
Run `pnpm dev` in the plasmo project.\
Add the build folder as you would add any extension in chrome (we're literally only adding the extension here!)

If you look into the console of the extension you should see the test message show up!

## later steps
As we start adding packages to @xten, we're going to start getting our own dependencies so we will have to run `pnpm install` in that folder as well but for now we have nothing.


## OPENAI notice
Code added is server side so make sure to never ship any openai configs with it – devs would likely want to have a way for users to input their own key in and use that.
