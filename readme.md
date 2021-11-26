Project to learn and showcase basic react concepts

### How to start a react project
1. Navigate to project directory in terminal
2. Run the following commands
* `npm install react`
* `npm install typescript`
* `npm install --save-dev @types/react`
* `npm install --save-dev @types/react-dom`
* `create-react-app my-app typescript`
3. Use `yarn` to build and run app (see generated `readme.md` after running the above)

### Function components
You can write a function that returns a `JSX.Element`. This is a fast alternative to write an entire class
that represents a `JSX.Element`.

If a custom element doesn't track state, then a function is sufficient. For example, a `Square` doesn't care
about its own state while a `Board` does.