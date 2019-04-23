/* eslint no-unused-vars: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
    FunctionalComponent,
    MyMemoComponent1,
    MyMemoComponent2,
    MyPureComponent,
    ThreeFunctionalComponents,
    StateComponent,
    StateAndPropsComponent,
    HighOrderFunctionalComponent,
    HocComponent
} from './code-react';

import styles from './styles';

const FPExamples = () => (
    <div className="main-container" style={styles}>
        <FunctionalComponent msg="functional component" />
        <MyPureComponent msg="pure component" />
        <ThreeFunctionalComponents />
        <StateComponent msg="Component with state" />
        <StateAndPropsComponent msg="Component with state and props" a={3} b={3} />
        <HighOrderFunctionalComponent
            msg1="High Order Functional Component wrapping Pure Component"
            msg2="Pure Component (wrapped by HOC)"
            anotherComponent={MyPureComponent}
        />
        <HocComponent />
        <MyMemoComponent1 msg="HOC - memo() #1" />
        <MyMemoComponent2 msg="HOC - memo() #2" />
    </div>
);

ReactDOM.render(<FPExamples />, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}
