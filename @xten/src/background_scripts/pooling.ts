// Methods to communicat with chatgpt through the background script

// Runs a given function after a specified amount of time
export const runAfter = (func, time) => {
    setTimeout(func, time);
}
