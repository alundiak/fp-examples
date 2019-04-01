import React from 'react';
import PropTypes from 'prop-types';

/* eslint react/no-multi-comp: 0 */

export function FunctionalComponent() { // aka stateless function
    return (
        <div>
            Hello, I am functional component.
        </div>
    );
}

export class PropsComponent extends React.Component {
    state = {
        message: 'I\'m React Component with state and props'
    }

    render() {
        const { message } = this.state;
        const { a, b } = this.props;
        return (
            <div>
                <p>{message} (a={a}, b={b}, a+b={a + b}) </p>
            </div>
        );
    }
}

PropsComponent.propTypes = {
    a: PropTypes.number,
    b: PropTypes.number
};

PropsComponent.defaultProps = {
    a: 2,
    b: 2
};

export class StateComponent extends React.Component {
    state = {
        message: 'I\'m React Component with state'
    }

    render() {
        const { message } = this.state;
        return (
            <div>
                <p>{message}</p>
            </div>
        );
    }
}

export function HighOrderFunctionalComponent(props) {
    const { consumer, anotherComponent: AnotherComponent } = props;
    return (
        <div>
            Hello {consumer}, I am High Order Component. And here is my wrapped component:
            <div>
                <AnotherComponent />
            </div>
        </div>
    );
}

HighOrderFunctionalComponent.propTypes = {
    consumer: PropTypes.string,
    anotherComponent: PropTypes.element,
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