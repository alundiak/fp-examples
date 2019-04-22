//
// PURE FUNCTIONS
//

//
// In functional code, the output value of a function depends only on the arguments that are passed to the function,
// so calling a function f twice with the same value for an argument x produces the same result f(x) each time;
//

// FP
function add(a, b) {
  return a + b;
}

// console.log(add(2, 2));

//
// in contrast to procedures depending on a local or global state, which may produce different results at different times
// when called with the same arguments but a different program state.
//

const mood = 'good';
// NOT FP
function add2(a, b) {
  if (mood === 'good') {
    return a + b;
  }
    return 'WTF';
}

// console.log(add2(2, 2));


//
// AVOID SIDE EFFECT
//
// https://en.wikipedia.org/wiki/Side_effect_(computer_science)
// Example side effects of a particular function might consist in:
// - modifying a non-local variable,
// - modifying a static local variable,
// - modifying a mutable argument passed by reference,
// - performing I/O or
// - calling other side-effect functions.

// NOT FP - modifying a non-local variable,
let firstName = 'Andrii';

function sideEffect1(obj) {
  firstName = 'NotAndrii';
}

// NOT FP - modifying a static local variable,
function sideEffect2(obj) {
  // let abc = 123;
  // logic;

  // if () {

  // }
  // ???
}

// sideEffect2.abc

// NOT FP - modifying a mutable argument passed by reference,
function sideEffect3(obj) {
  obj.h = 789; // NOT FP
  Object.assign(obj, {
    i: 789
  }); // NOT FP
  console.log(obj);
  return obj;
}

// sideEffect3({f: 123, g: 456});

// FP - not mutating example
function notMutate(obj) {
  // let localObj = JSON.parse(JSON.stringify(obj));
  const localObj = Object.assign({}, obj); // pass in an empty object as the first parameter to copy the properties of obj
  delete localObj.g;
  localObj.h = 789;
  console.log('obj:', obj);
  console.log('localObj:', localObj);
  return localObj;
}

// notMutate({f: 123, g: 456});

// https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0
function usingFreeze() {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
  const a = Object.freeze({
    foo: 'Hello',
    bar: 'world',
    baz: '!'
  });

  a.foo = 'Goodbye';
  // Error: Cannot assign to read only property 'foo' of object Object
  // no error, but not changed !!!

  console.log(a);
}

// NOT WORKING !!!
// usingFreeze();

//
// First-class and higher-order functions
//

//
// The distinction between the two is subtle:
// - "higher-order" describes a mathematical concept of functions that operate on other functions, while
// - "first-class" is a computer science term that describes programming language entities that have NO restriction on their use.
//

function hof1(greetingFunc) {
  if (typeof greetingFunc === 'function') {
    greetingFunc();
  }
}

const aFunc = function () {
  console.log('Hello HOF');
};

// hof1(aFunc);

//
// CURRYING example
//
// https://en.wikipedia.org/wiki/Currying
function hof2() {
  const firstName = 'Andrii';

  return function (lastName) {
    return `${firstName} ${lastName}`;
  };
}

// console.log(hof2()('Lundiak'));

//
// FUNCTION COMPOSITION
// is the process of combining two or more functions in order to produce a new function or perform some computation
// For example, the composition f . g (the dot means “composed with”) is equivalent to f(g(x)) in JavaScript.

// SIMILAR

//
// LAMBDA CALCULUS https://en.wikipedia.org/wiki/Lambda_calculus
//

// It is a universal model of computation that can be used to simulate any Turing machine.
// In typed lambda calculus, functions can be applied only if they are capable of accepting the given input's "type" of data.
//
const result1 = (
  function (x) {
    return x * x;
  }
)(2);
console.log(result1); // 4

let result2 = (x => x * x)(2);
console.log(result2); // 4

//
// RECURSION
//
// Fibonacci example
let entries = 0;

function fib(x) {
  console.log('entry ', entries++);
  if (x === 0 || x === 1) {
    return x;
  }
  return fib(x - 1) + fib(x - 2);
}
console.log(fib(5));

//
// Strict versus non-strict evaluation
//
function abc() {
  'use strict'; //eslint-disable-line
  console.log(2 / 3, 1 / 0);
  // console.log(2/3, 1/'hello');
}

// abc();
// TODO

//
// SHARED STATE
//

// TODO

//
// In the presence of side effects, a program's behaviour may depend on history; that is, the order of evaluation matters.
//

//
// If there is no data dependency between two pure expressions, their order can be reversed,
// or they can be performed in parallel and they cannot interfere with one another (in other terms,
// the evaluation of any pure expression is thread-safe).
//
function pure1(a, b) {
  const rndInt = Math.floor(Math.random() * Math.floor(a));
  const sqrtB = Math.sqrt(b);
  console.log(rndInt);
  console.log(sqrtB);
}

// pure1(111,144);

// nice example
// https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0
//
// With shared state, the order in which function calls are made changes the result of the function calls.
const x = {
  val: 2
};
const x1 = () => x.val += 1;
const x2 = () => x.val *= 2;
x1();
x2();
// console.log(x.val); // 6
// This example is exactly equivalent to the above, except...
const y = {
  val: 2
};
const y1 = () => y.val += 1;
const y2 = () => y.val *= 2;
// ...the order of the function calls is reversed...
y2();
y1();
// ... which changes the resulting value:
// console.log(y.val); // 5


// JS built-in functions and FP

[1, 2, 3, 4].map((elem, index, arr) => {
  // map is high-order function
});