/* eslint no-unused-vars: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
    FunctionalComponent,
    StateComponent,
    StateAndPropsComponent,
    HighOrderFunctionalComponent,
    withHoc
} from './code-react';

const FunctionProgrammingExamples = () => {
    const HocComponent = withHoc(StateAndPropsComponent, {
        a: 99,
        b: 1,
        userName: 'Andrzej'
    });

    return (
        <React.Fragment>
            <FunctionalComponent userName="Andrii1" />
            <StateComponent />
            <StateAndPropsComponent a={3} b={3} userName="Andrii2" />
            <HighOrderFunctionalComponent
                userName="Andrii3"
                anotherComponent={<FunctionalComponent />}
            />
            <HocComponent />
        </React.Fragment>
    );
};

ReactDOM.render(<FunctionProgrammingExamples />, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}
