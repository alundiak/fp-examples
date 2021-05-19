import React from 'react';
import './App.css';

import {
  FunctionalComponent,
  MyPureComponent,
  StateComponent,
  StateAndPropsComponent,
  MySideEffect,
  HocFunc,
  CreatedWithHocComponent,
  MyMemoComponentWithFuncComp,
  MyMemoComponentWithRegularFunc,
  MyMemoComponentWithUnNamedFunc,
  MyMemoComponentWithFatArrow,
  ThePowerOfHooks,
  Name,
  ReversedName
  // WithAllMyHeart
} from './code-react';
import {
  ThreeFunctionalComponents,
  UsersAndStocks
} from './more-reality';

const FPExamples = () => (
  <div className="container">
    <FunctionalComponent msg="Functional Component" />
    <MyPureComponent msg="Pure Component" />
    <StateComponent msg="Component with state" />
    <StateAndPropsComponent msg="Component with state and props" a={3} b={3} />
    <MySideEffect />
    <HocFunc
      msg1="High Order Functional Component wrapping Pure Component"
      msg2="Pure Component (wrapped by HOC)"
      anotherComponent={MyPureComponent}
    />
    <CreatedWithHocComponent />
    <MyMemoComponentWithFuncComp msg="HOC - memo() #1" />
    {/* @ts-ignore */}
    <MyMemoComponentWithRegularFunc msg="HOC - memo() #2" />
    {/* @ts-ignore */}
    <MyMemoComponentWithUnNamedFunc msg="HOC - memo() #3" />
    {/* @ts-ignore */}
    <MyMemoComponentWithFatArrow msg="HOC - memo() #4" />
    <ThePowerOfHooks />
    <ThePowerOfHooks msg="Use Hooks and be happy." />
    <Name>Hello</Name>
    <ReversedName>Hello</ReversedName>
    {/* <WithAllMyHeart /> */}
  </div>
);

const MoreReality = () => (
  <div className="container">
    <ThreeFunctionalComponents />
    <br />
    <UsersAndStocks />
  </div>
);

function App() {
  return (
    <div className="App">
      <FPExamples />
      {/* <MoreReality /> */}
    </div>
  );
}

export default App;
