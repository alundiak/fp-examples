/* eslint no-unused-vars: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
    FunctionalComponent,
    MyPureComponent,
    StateComponent,
    StateAndPropsComponent,
    HocFunc,
    CreatedWithHocComponent,
    MyMemoComponentWithFuncComp,
    MyMemoComponentWithRegularFunc,
    MyMemoComponentWithUnNamedFunc,
    MyMemoComponentWithFatArrow
} from './code-react';
import {
    ThreeFunctionalComponents,
    UsersAndStocks
 } from './more-reality';

import styles from './styles';

const FPExamples = () => (
    <div className="container" style={styles}>
        <FunctionalComponent msg="functional component" />
        <MyPureComponent msg="pure component" />
        <StateComponent msg="Component with state" />
        <StateAndPropsComponent msg="Component with state and props" a={3} b={3} />
        <HocFunc
            msg1="High Order Functional Component wrapping Pure Component"
            msg2="Pure Component (wrapped by HOC)"
            anotherComponent={MyPureComponent}
        />
        <CreatedWithHocComponent />
        <MyMemoComponentWithFuncComp msg="HOC - memo() #1" />
        <MyMemoComponentWithRegularFunc msg="HOC - memo() #2" />
        <MyMemoComponentWithUnNamedFunc msg="HOC - memo() #3" />
        <MyMemoComponentWithFatArrow msg="HOC - memo() #4" />
    </div>
);

const MoreReality = () => (
    <div className="container">
        <ThreeFunctionalComponents />
        <br />
        <UsersAndStocks />
    </div>
);

ReactDOM.render(<FPExamples />, document.getElementById('app'));
// ReactDOM.render(<MoreReality />, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}
