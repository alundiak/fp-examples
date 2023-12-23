/* eslint func-names: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */
/* eslint no-plusplus: 0 */
/* eslint no-return-assign: 0 */
/* eslint array-callback-return: 0 */

//
// https://www.freecodecamp.org/news/memoization-in-javascript-and-react/#javascript-memoization-example
// Based on the concept of purity in functional programming paradigms, a function is said to be pure if:
// - Its return value is only determined by its input values
// - Its return value is always the same for the same input values

//
// PURE FUNCTIONS - EXAMPLE 1
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
// NOT PURE FUNCTION
function addImpure(a, b) {
  if (mood === 'good') {
    return a + b;
  }
  return 'WTF';
}

// console.log(add2(2, 2));

// Test cases
const test = (testFunc) => {
  // should return the sum of two numbers when mood is good
  (() => {
    const result = testFunc(3, 5, 'good');
    // expect(result).toBe(8);
  })();

  // should return "WTF" when mood is not good
  (() => {
    const result = testFunc(3, 5, 'bad');
    // expect(result).toBe('WTF');
  })();
};
// test(add)
// test(addImpure)

//
// PURE FUNCTIONS - EXAMPLE 2
//

//
// Another example
// https://www.geeksforgeeks.org/pure-functions-in-javascript/
// 
//
function calculatePure(productPrice) {
  return productPrice * 0.05;
}
// console.log('result of Pure function execution', calculatePure(15));

let tax = 20;
function calculateNotPure(productPrice) {
  return productPrice * (tax / 100) + productPrice;
}
// console.log('result of NOT Pure function execution', calculateNotPure(15));

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

// https://en.wikipedia.org/wiki/Higher-order_function
// example
const twice = (f, v) => f(f(v));
const add3 = v => v + 3;
// twice(add3, 7); // 13

// Kind of my example.
function hof1(greetingFunc) {
  if (typeof greetingFunc === 'function') {
    greetingFunc();
  }
}
// Not sure if it's HOF, because it doesn't return, it DOES execute.

const aFunc = function () {
  console.log('Hello HOF');
};

// hof1(aFunc);

//
// Factory functions
//

//
// - A function is a "factory function" when it returns a new object without the use of the `new` keyword!
// - In functional programming, functions are treated as first-class citizens, meaning they can be passed around as arguments to other functions, 
// returned as values from other functions, and assigned to variables.
// - A factory function is a function that returns another function or object. It is often used to create closures, 
// which are functions that have access to variables from their lexical scope even after the scope has finished executing. 
//
function testFactoryFunctions() {
  function createCounter() {
    let count = 0;

    function increment() {
      count++;
      console.log(count);
    }

    return increment;
  }

  // createCounter is a factory function that returns the increment function. 
  // The increment function, in turn, has access to the count variable from the lexical scope of createCounter. 

  const counter = createCounter();
  counter(); // Output: 1
  counter(); // Output: 2
}
testFactoryFunctions();

//
// CLOSURE - High Order Function ? which just return another function?
// https://en.wikipedia.org/wiki/Closure_(computer_programming)
// "In programming languages, a closure, also lexical closure or function closure,
// is a technique for implementing lexically scoped name binding in a language with first-class functions."
//
// https://medium.freecodecamp.org/discover-the-power-of-first-class-functions-fd0d7b599b69
function createGenerator(prefix) {
  let index = 0;
  return function generateNewID() {
    index++;
    return prefix + index.toString();
  };
}
const generateNewID = createGenerator("btn");
// console.log(generateNewID()); //btn1
// console.log(generateNewID()); //btn2
// console.log(generateNewID()); //btn3
// Using closure, we can create a function with private state.


//
// CURRYING example
//
// https://en.wikipedia.org/wiki/Currying

const notCurry = (x, y, z) => x + y + z; // a regular function
const curry = x => y => z => x + y + z; // a curry function

const sum = x => y => x + y;
// returns the number 3
// sum(2)(1);
// returns a function y => 2 + y
// sum(2);

function hofCurry() {
  const firstName = 'Andrii';

  return function (lastName) {
    return `${firstName} ${lastName}`;
  };
}
// console.log(hofCurry()('Lundiak1'));

function hofCurry2() {
  return lastName => `Andrii ${lastName}`;
}
// console.log(hofCurry2()('Lundiak2'));


//
// FUNCTION COMPOSITION
// is the process of combining two or more FUNCTIONs in order to produce a new FUNCTION or perform some computation
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
  }(2));
// console.log(result1); // 4

const result2 = (x => x * x)(2);
// console.log(result2); // 4

//
// RECURSION
//
// Fibonacci example
let entries = 0;

function fib(x) {
  console.log('entry ', entries++);
  return fib(x - 1) + fib(x - 2);
}
// console.log(fib(5));

//
// MEMOIZATION (because of Pure function theory and the need to avoid recalculation, need in caching mechanism)
//
// Standard Example of getting Fibonacci number (NON-MEMOIZED)
// https://www.freecodecamp.org/news/memoization-in-javascript-and-react/#javascript-memoization-example
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
const nonMemoizedFib = n => {
  if (n <= 1) return 1; // to avoid an infinite loop
  return nonMemoizedFib(n - 1) + nonMemoizedFib(n - 2)
}
// console.log(nonMemoizedFib()); // RangeError: Maximum call stack size exceeded
// console.log(nonMemoizedFib(0)); // => 1
// console.log(nonMemoizedFib(5)); // => 8

//
// Memoized Example of getting Fibonacci number (in other words CACHING MECHANISM)
//
const fibMemoized = (n, memo) => {
  memo = memo || {};

  if (memo[n]) return memo[n];

  if (n <= 1) return 1;

  return memo[n] = fibMemoized(n - 1, memo) + fibMemoized(n - 2, memo);
}

// console.log(fibMemoized()); // RangeError: Maximum call stack size exceeded
// console.log(fibMemoized(0)); // 1
// console.log(fibMemoized(5)); // 8

//
// 3rd-party libraries to memoise/memoize:
// https://lodash.com/docs/4.17.15#memoize
// https://github.com/planttheidea/micro-memoize
// https://www.freecodecamp.org/news/understanding-memoize-in-javascript-51d07d19430e/

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
// SHARED STATE (because or from PURE FUNCTIONS theory)
//

// TODO

//
// In the presence of side effects, a program's behavior may depend on history; that is, the order of evaluation matters.
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
