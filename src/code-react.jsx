import React from 'react';
import PropTypes from 'prop-types';

/* eslint react/no-multi-comp: 0 */

export function FunctionalComponent(props) {
    // aka stateless function
    const { userName } = props;
    return <div>Hello {userName}, I am functional component.</div>;
}
// TODO
// FunctionalComponent.propTypes

// TODO add React.memo() here
// export class MyMemoComponent extends React.memo();

export class MyPureComponent extends React.PureComponent {
    // TODO
}

export class StateComponent extends React.Component {
    // aka stateful component
    state = {
        message: "I'm React Component with state"
    };

    render() {
        const { message } = this.state;
        return (
            <div>
                <p>{message}</p>
            </div>
        );
    }
}

export class StateAndPropsComponent extends React.Component {
    static propTypes = {
        userName: PropTypes.string.isRequired,
        a: PropTypes.number,
        b: PropTypes.number
    };

    static defaultProps = {
        a: 2,
        b: 2
    };

    state = {
        message: "I'm React Component with state and props"
    };

    render() {
        const { message } = this.state;
        const { a, b, userName } = this.props;
        return (
            <div>
                <p>
                    Hello {userName}, {message} (a={a}, b={b}, a+b={a + b})
                </p>
            </div>
        );
    }
}

export function HighOrderFunctionalComponent(props) {
    const { userName, anotherComponent: AnotherComponent } = props;
    return (
        <div>
            Hello {userName}, I am High Order Component. And here is my wrapped component:
            <div>
                <AnotherComponent userName={`Modified ${userName}`} />
            </div>
        </div>
    );
}

HighOrderFunctionalComponent.propTypes = {
    userName: PropTypes.string,
    anotherComponent: PropTypes.element
};

HighOrderFunctionalComponent.defaultProps = {
    userName: '',
    anotherComponent: <div>abc</div>
};

// Simple version passing just wrapped component
// Advanced version passing data and using data after change/?mutate?/composing in withHoc
// FUNCTION
export function withHoc(WrappedComponent, data) {
    // CLASS
    return class extends React.Component {
        render() {
            return (
                <div className="hoc-component">
                    <WrappedComponent {...data} />
                </div>
            );
        }
    };
}
