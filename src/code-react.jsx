import React from 'react';
import PropTypes from 'prop-types';

/* eslint react/no-multi-comp: 0 */

export function FunctionalComponent(props) {
    // aka stateless function
    const { msg } = props;
    return <div>I am {msg}</div>;
}
// TODO
// FunctionalComponent.propTypes

//
// Function life - idealistic functional flow
//

const myData = {
    pageName: 'Great Page',
    pageData: [
        {
            id: 1,
            name: 'Item 1'
        },
        {
            id: 2,
            name: 'Item 2'
        }
    ]
};

const ItemFC = ({ id, name }) => (
    <li>
        <span>{id}</span> | <span>{name}</span>
    </li>
);

/* eslint arrow-parens: 0 */
const ListFC = props => {
    const { listData } = props;
    return (
        <ul>
            {listData.map(itemData => (
                <ItemFC key={itemData.id} {...itemData} />
            ))}
        </ul>
    );
};

const PageFC = ({ pageName, pageData }) => (
    <div style={{ border: '1px solid red' }}>
        <h4>{pageName}</h4>
        <ListFC listData={pageData} />
    </div>
);

export const ThreeFunctionalComponents = () => <PageFC {...myData} />;

export class MyPureComponent extends React.PureComponent {
    // aka stateless pure component
    /* eslint no-useless-constructor: 0 */
    constructor(props) {
        super(props);
    }

    render() {
        const { msg } = this.props;
        return <div>I am {msg}.</div>;
    }
}

export class StateComponent extends React.Component {
    // aka stateful component
    state = {
        message: "I'm React Component with state. Click Me."
    };

    onClick = () => {
        this.setState({
            message: 'You clicked on statful component'
        });
    };

    render() {
        /* eslint jsx-a11y/click-events-have-key-events: 0 */
        /* eslint jsx-a11y/no-static-element-interactions: 0 */
        const { message } = this.state;
        return (
            <div onClick={this.onClick}>
                <strong>{message}</strong>
            </div>
        );
    }
}

export class StateAndPropsComponent extends React.Component {
    static propTypes = {
        msg: PropTypes.string.isRequired,
        a: PropTypes.number,
        b: PropTypes.number
    };

    static defaultProps = {
        a: 2,
        b: 2
    };

    state = {
        message: 'I am '
    };

    render() {
        const { message } = this.state;
        const { a, b, msg } = this.props;
        return (
            <div>
                <p>
                    {message} {msg} (a={a}, b={b}, a+b={a + b})
                </p>
            </div>
        );
    }
}

export function HighOrderFunctionalComponent(props) {
    const { msg1, msg2, anotherComponent: AnotherComponent } = props;
    return (
        <div>
            I am {msg1}, and here is my wrapped component:
            <div style={{ marginLeft: '20px' }}>
                <AnotherComponent msg={msg2} />
            </div>
        </div>
    );
}

HighOrderFunctionalComponent.propTypes = {
    msg1: PropTypes.string,
    msg2: PropTypes.string,
    anotherComponent: PropTypes.func
    // anotherComponent: PropTypes.element
    // anotherComponent: PropTypes.node
};

HighOrderFunctionalComponent.defaultProps = {
    msg1: '',
    msg2: '',
    anotherComponent: <div>abc</div>
};

// Simple version passing just wrapped component
// Advanced version passing data and using data after change/?mutate?/composing in withHoc
// FUNCTION
const createHOC = (WrappedComponent, data) => {
    // CLASS
    class HocClass extends React.Component {
        render() {
            return (
                <div className="hoc-component">
                    <WrappedComponent {...data} />
                </div>
            );
        }
    }
    return HocClass;
};

export const HocComponent = createHOC(StateAndPropsComponent, {
    a: 99,
    b: 1,
    msg: 'Stateful component wrapped by HOC'
});

//
// HOC + Memoization
//
export const MyMemoComponent1 = React.memo(FunctionalComponent);

/* eslint prefer-arrow-callback: 0 */
export const MyMemoComponent2 = React.memo(function FunctionalComponent2(props) {
    const { msg } = props;
    return <div>I am FunctionalComponent2 inside of {msg}.</div>;
});
