/* eslint react/no-multi-comp: 0 */

import React from 'react';
// import PropTypes from 'prop-types';

export function FunctionalComponent(props) {
  // aka stateless function
  const { msg } = props;
  return <div>{msg}</div>;
}
// TODO
// FunctionalComponent.propTypes

export class MyPureComponent extends React.PureComponent {
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
// Avoid Side Effect
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

//
// HOC + Memoization
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

export const ThePowerOfHooks = (props) => {
  const [myMessage, setMyMessage] = React.useState(props.msg || 'Functional Component using hooks'); //eslint-disable-line

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