# Injecting ui into webpages

Xten exports a class that handles injecting ui for you.

To get started, you just need to call `xten.Injector` and export the relevant configs in `content.ts` like so:
```
const i = xten.Injector

export const config = (() => i.getConfig())()
export const getRootContainer = (() => i.getRootContainerConfig())()
export const render = (() => i.getRenderer())()
```
## Some helpfeul notes:
1. You will need to configure which urls you'd want the injection to work on.
2. Specify the container you'd like to replace.
3. renderElem takes in react components! 

Example use case:
```

const i = xten.Injector

// configure url matches
i.configure({
  matches: ["https://www.utu.fi/*"]
})

// get root container by id
i.injectById("block-herotitleblock")

const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
  return (
    <span
      style={{
        background: "yellow",
        padding: 12
      }}>
      HELLO WORLD ROOT CONTAINER
    </span>
  )


// inject element
i.renderElem(<PlasmoOverlay />)

export const config = (() => i.getConfig())()
export const getRootContainer = (() => i.getRootContainerConfig())()
export const render = (() => i.getRenderer())()

```
