import React from 'react';

import {
  FunctionalComponent,
  MyPureClassComponent,
  MyImpureFunctionalComponent,
  NoStateReactPureComponent,
  StateComponent,
  StateAndPropsComponent,
  MySideEffect,
  CounterStateReactComponent,
  HocFunc,
  CreatedWithHocComponent,
  MyMemoComponentWithFuncComp,
  MyMemoComponentWithRegularFunc,
  MyMemoComponentWithUnNamedFunc,
  MyMemoComponentWithFatArrow,
  ThePowerOfHooks,
  Name,
  ReversedName,
  CounterFunctionalComponentWithHooks,
  MemoVsCallback,
  // WithAllMyHeart
} from './code-react';

import {
  ThreeFunctionalComponents,
  UsersAndStocks
} from './more-reality';


const FPExamples = () => (
  <div className="container">
    <FunctionalComponent msg="Functional Component" />
    <NoStateReactPureComponent msg="no state React.PureComponent" />
    <MyPureClassComponent name="Andrii" lastName="Lundiak" />
    <MyImpureFunctionalComponent name="Johannes" lastName="Lundiak" />
    <StateComponent msg="Component with state" />
    <StateAndPropsComponent msg="Component with state and props" a={3} b={3} />
    <CounterStateReactComponent />
    <MySideEffect />

    <HocFunc
      msg1="High Order Functional Component wrapping Pure Component"
      msg2="Pure Component (wrapped by HOC)"
      anotherComponent={NoStateReactPureComponent}
    />
    <CreatedWithHocComponent />
    <MyMemoComponentWithFuncComp msg="HOC - memo() #1" />
    {/* @ts-ignore */}
    <MyMemoComponentWithRegularFunc msg="HOC - memo() #2" />
    {/* @ts-ignore */}
    <MyMemoComponentWithUnNamedFunc msg="HOC - memo() #3" />
    {/* @ts-ignore */}
    <MyMemoComponentWithFatArrow msg="HOC - memo() #4" />

    <CounterFunctionalComponentWithHooks />

    <ThePowerOfHooks />
    <ThePowerOfHooks msg="Use Hooks and be happy." />

    <MemoVsCallback msg="useMemo() vs useCallback()" />

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
      <MoreReality />
    </div>
  );
}

export default App;
