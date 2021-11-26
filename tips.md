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

Function components are sufficient when all they need are props and don't care about state.
Class components are sufficient when we care about props and state and want to define helper functions (E.g, a `Board` needing a `renderSquare(i)` method)

### Props vs state
Props are immuatable. State is mutable.

Make a `XProps` and `XState` type or interface for `X` component and then make the custom Element like so:
`class X extends React.Component<XProps, XState>` 