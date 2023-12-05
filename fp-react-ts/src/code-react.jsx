/* eslint react/no-multi-comp: 0 */
import React, { useState, useCallback, useMemo } from 'react'
// import PropTypes from 'prop-types';

export function FunctionalComponent(props) {
  // aka stateless function
  const { msg } = props;
  return <div>{msg}</div>;
}
// TODO
// FunctionalComponent.propTypes

//
// Another examples of Pure and Impure Components with React
// https://www.freecodecamp.org/news/memoization-in-javascript-and-react/#react-memoization-example
//

// Pure Class component
export class MyPureClassComponent extends React.Component {
  render() {
    return (
      <div>My "pure" name is {this.props.name} {this.props.lastName}</div>
    )
  }
}

// Impure Functional component
export function MyImpureFunctionalComponent({ name, lastName }) {
  return (
    <div>My "impure" name is {name + Math.random()} {lastName + Math.random()}</div>
  )
}

//
// https://www.freecodecamp.org/news/memoization-in-javascript-and-react/#react-memoization-example
// Class components that extend the React.PureComponent class have some performance improvements and render optimizations. 
// This is because React implements the shouldComponentUpdate() method for them with a shallow comparison for props and state.
// When child components rendered EVEN if same props received we need to implement 
// memoization and optimize this situation, we need to extend the React.PureComponent class in our child component
//
export class NoStateReactPureComponent extends React.PureComponent {
  // aka stateless pure component
  /* eslint no-useless-constructor: 0 */
  constructor(props) {
    super(props);
  }

  render() {
    const { msg } = this.props;
    return <div>{msg}.</div>;
  }
}

export class StateComponent extends React.Component {
  // aka stateful component
  state = {
    message: "Component with state only. "
  };

  onClick = () => {
    this.setState({
      message: 'You clicked on stateful component. '
    });
  };

  render() {
    /* eslint jsx-a11y/click-events-have-key-events: 0 */
    /* eslint jsx-a11y/no-static-element-interactions: 0 */
    const { message } = this.state;
    return (
      <div>
        <span>{message} </span>
        <button
          type="button"
          className="btn btn-sm btn-link"
          onClick={this.onClick}>Click Me
        </button>
      </div>
    );
  }
}

export class StateAndPropsComponent extends React.Component {
  // static propTypes = {
  //     msg: PropTypes.string.isRequired,
  // };

  state = {
    message: `${this.props.msg}. ` // eslint-disable-line
  };

  onClick = () => {
    this.setState({
      message: 'You clicked on stateful component with props. '
    });
  };

  render() {
    const { message } = this.state;
    return (
      <div onClick={this.onClick}>
        <span>
          {message}
        </span>
        <button
          type="button"
          className="btn btn-sm btn-link"
          onClick={this.onClick}>Click Me
        </button>
      </div>
    );
  }
}

//
// https://www.freecodecamp.org/news/memoization-in-javascript-and-react/#purecomponent-class
//
// class Child extends React.Component { // IMPURE (with redundancy memory usage)
class Child extends React.PureComponent { // PURE (PureComponent gives us some memoization)
  render() {
    // When wrapped by <React.StrictMode> it logs TWICE (no matter if extended from React.Component or React.PureComponent)
    console.log("Skinny Jack");
    // But what is IMPORTANT HERE that when extends from React.PureComponent <Child /> renders ONLY ONCE - "the most pure way" as FP expects.

    return (
      <p>{this.props.name}</p>
    )
  }
}

export class CounterStateReactComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  handleIncrement = () => {
    this.setState(prevState => {
      return { count: prevState.count - 1 };
    })
  }

  handleDecrement = () => {
    this.setState(prevState => {
      return { count: prevState.count + 1 };
    })
  }

  render() {
    console.log("Parent render"); // When wrapped by <React.StrictMode> it logs TWICE

    return (
      <div>
        <p>Counter (React.Component) + Child (React.PureComponent)</p>
        <button onClick={this.handleIncrement}>Increment</button>
        <button onClick={this.handleDecrement}>Decrement</button>
        <h3>{this.state.count}</h3>
        <Child name={"Skinny Jack"} />
      </div>
    )
  }
}
//
// FP says "Avoid Side Effect" and here is example how to NOT do???
//

export class MySideEffect extends React.Component {
  state = {
    myField: 'My SideEffect 1',
    flagState: true,
    onFieldClick: () => { }
  };

  toggleFunc = (flag) => {
    if (flag) {
      this.setState({
        myField: 'My SideEffect 2',
        onFieldClick: () => this.toggleFunc(false)
      });
    } else {
      this.setState({ myField: 'My SideEffect 1 (changed)' });
    }
  };

  render() {
    const { myField, flagState, onFieldClick } = this.state;

    return (
      <div>
        <span onClick={onFieldClick} title="Click me too">{myField}</span>
        <button
          type="button"
          className="btn btn-sm btn-link"
          onClick={() => this.toggleFunc(flagState)}>Click me
        </button>
      </div>
    );
  }
}

//
// JS:
// A Higher-Order Function is a FUNCTION that takes another FUNCTION as an input, returns a FUNCTION or does both.
// ReactJS:
// https://reactjs.org/docs/higher-order-components.html
// A Higher-Order Component is a FUNCTION that takes a COMPONENT and returns a new COMPONENT.
// A HOC is a pure function with zero side-effects.
// Whereas a component transforms props into UI, a higher-order component transforms a component into another component.
// There are similarities between HOCs and a pattern called container components.
// Container components are part of a strategy of separating responsibility between high-level and low-level concerns.
// HOCs are common in third-party React libraries, such as Redux’s connect.
//

//
// Simple version passing just wrapped component
//
export function HocFunc(props) {
  const { msg1, msg2, anotherComponent: AnotherComponent } = props;
  return (
    <div>
      {msg1}, and here is my wrapped component:
      <div>
        <AnotherComponent msg={msg2} />
      </div>
    </div>
  );
}

//
// Advanced version passing data and using data after change/?mutate?/composing in withHoc
//
// FUNCTION
const createHOC = (WrappedComponent, data) => {
  // CLASS
  class HocDevClass extends React.Component {
    render() {
      return (
        <div className="hoc-component">
          <WrappedComponent {...data} />
        </div>
      );
    }
  }
  return HocDevClass;
};

export const CreatedWithHocComponent = createHOC(StateAndPropsComponent, {
  msg: 'Stateful component wrapped by HOC'
});
// typeof HocComponent => "function"

// https://www.freecodecamp.org/news/memoization-in-javascript-and-react/#purecomponent-class
// In functional components we can't extend the React.PureComponent class. 
// Instead, React offers one HOC and two hooks to deal with memoization.

// FP: "power" because `props.msg` literally left alone which helps to avoid mutation.
export const ThePowerOfHooks = (props) => {
  const [myMessage, setMyMessage] = useState(props.msg || 'Functional Component using hooks'); //eslint-disable-line

  // TODO react.useEffect()

  const onClick = () => {
    setMyMessage('Yeah, you clicked again. But this time, inside of Functional Component with state using Hooks.');
  };

  return (
    <div>
      <span>
        {myMessage}
      </span>
      <button
        type="button"
        className="btn btn-sm btn-link"
        onClick={onClick}>Click Me
      </button>
    </div>
  );
};

//
// HOC + Memoization (memo does a similar job to PureComponent, avoiding unnecessary re-renders of the components it wraps)
//
export const MyMemoComponentWithFuncComp = React.memo(FunctionalComponent);

/* eslint prefer-arrow-callback: 0 */
export const MyMemoComponentWithRegularFunc = React.memo(function FunctionalComponent2(props) {
  const { msg } = props;
  return (
    <div>
      FunctionalComponent2 (regular function) inside of {msg}.
    </div>
  );
});

/* eslint func-names: 0 */
export const MyMemoComponentWithUnNamedFunc = React.memo(function (props) {
  const { msg } = props;
  return <div>FunctionalComponent3 (via unnamed func.) inside of {msg}.</div>;
});

export const MyMemoComponentWithFatArrow = React.memo((props) => {
  const { msg } = props;
  return <div>FunctionalComponent4 (via fat arrow func.) inside of {msg}.</div>;
});

//
// React.memo() + React.useCallback() 
//

// React.memo() doesn't work if the prop being passed to the component is a function
// So passing prop `name` as function is bad.
// In reality a new function is being created on EVERY parent component re-render. 
// So if a new function is being created, that means we have a NEW PROP and that means our child component should re-render as well.
export const ExoticMemoizedChildComponent = React.memo(function Child({ name }) {
  console.log("Skinny Jack (2)", name);
  return (
    <>
      {name()}
      <div>Really Skinny Jack (2)</div>
    </>
  )
});

export function CounterFunctionalComponentWithHooks() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);

  return (
    <div>
      {console.log('parent')}
      <p>CounterWithHooks FC + ExoticMemoizedChildComponent (React.memo)</p>
      <button onClick={() => handleIncrement()}>Increment</button>
      <button onClick={() => handleDecrement()}>Decrement</button>

      <h2>{count}</h2>

      {/* Bad, not memoized, re-renders ALWAYS */}
      {/* <ExoticMemoizedChildComponent name={() => console.log('Skinny Jack (basic function)')} /> */}
      {/* Better. Re-renders ONLY ONCE */}
      <ExoticMemoizedChildComponent name={useCallback(() => { console.log('Skinny Jack (w useCallback())') }, [])} />
    </div>
  )
}

//
// React.useMemo() hook
//
// https://www.freecodecamp.org/news/memoization-in-javascript-and-react/#when-to-use-the-usememo-hook
// useMemo is a hook very similar to useCallback, but instead caching a function, useMemo will cache the return value of a function.
// You can use useMemo in a very similar way to the memo HOC. The difference is that useMemo is a hook with an array of dependencies, 
// and memo is a HOC that accepts as parameter an optional function that uses props to conditionally update the component.

export const MemoVsCallback = ({ msg }) => {

  var num = 1
  const answerMemoized = useMemo(() => num + 1, [num])
  console.log(answerMemoized); // 2

  var num = 1
  const AnswerCallbacked = useCallback(() => num + 1, [num]);
  console.log(AnswerCallbacked); // () => num + 1

  return (
    <>
      <h3>{msg}</h3>
      answerMemoized: <div>{answerMemoized}</div>
      answerCallbacked: <div><AnswerCallbacked /></div>
    </>
  );
}
//
// CURRYING (may also interfere with term Chaining)
// ReactJS HOC takes another COMPONENT as argument.
//

// f(x)()()
// function_HOC
//         function
//                  ReactJS Component
//

/* eslint-disable */
// due to anonymous function in reactDevTool => <Unknown></Unknown>
const reverseShort = PassedComponent => ({ children, ...props }) => (
  <PassedComponent {...props}>
    Currying (1 level): {children.split("").reverse().join("")}
  </PassedComponent>
);

const reverse = (PassedComponent) => {
  return function ReversedName({ children, ...props }) {
    return (
      <PassedComponent {...props}>
        Currying (1 level): {children.split("").reverse().join("")}
      </PassedComponent>
    );
  }
};

export const Name = (props) => <div>{props.children}</div>;
export const ReversedName = reverse(Name);


//=> <span>olleH</span>

// const withModal = (props) => {
//     console.log(props);
//     return (
//         <div className="modal">
//             {props.children}
//         </div>
//     );
// }

// const withAlerts = (WrappedComponent) => {
//     console.log(props);
//     const { message, error } = props;
//     return (
//         <div className="modal">
//             <div className="alert alert-primary" role="alert">{message}</div>
//             <div className="alert alert-danger" role="alert">{error}</div>
//             <WrappedComponent />
//         </div>
//     );
// }

// const withAll = withModal => withAlerts => {
//     console.log(this, arguments, withModal, withAlerts);

//     return (
//         <div>
//             {props.children}
//         </div>
//     );
// };

// const withAll = (InputComponent) => {

//     return (ModalComponent) => {
//         return (withAlerts) => {

//         }
//     }
// }

// export const WithAllMyHeart = withAll(MyCustomComponent)(MyModalComponent)();

// Redux
export const withMiddleware = store => next => action => {
  // do something
  // next(action);
  // or
  // state.dispatch();
}
/* eslint-enable */
