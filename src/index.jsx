/* eslint no-unused-vars: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  FunctionalComponent,
  PropsComponent,
  StateComponent,
  HighOrderFunctionalComponent,
  withHoc
} from './code-react';

// ReactDOM.render(<FunctionalComponent />, document.getElementById('app'));
// ReactDOM.render(<StateComponent />, document.getElementById('app'));
// ReactDOM.render(<PropsComponent a={3} b={3} />, document.getElementById('app'));
// ReactDOM.render(<HighOrderFunctionalComponent consumer="Andrii" anotherComponent={(<FunctionalComponent />)} />, document.getElementById('app'));
const HocComponent = withHoc(PropsComponent, { a: 99, b: 1 });
ReactDOM.render(<HocComponent />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
