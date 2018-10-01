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
var mood = 'good';
// NOT FP
function add2(a, b) {
  if (mood === 'good') {
    return a + b;
  } else {
    return 'WTF';
  }
}

// console.log(add2(2, 2));


// NOT FP
function mutate(obj) {
  obj.h = 789; // NOT FP
  Object.assign(obj, {i: 789}); // NOT FP
  console.log(obj);
  return obj;
}

// mutate({f: 123, g: 456});


// FP
function notMutate(obj) {
  let localObj = JSON.parse(JSON.stringify(obj));
  delete localObj.g;
  localObj.h = 789; // NOT FP
  console.log('obj:', obj);
  console.log('localObbj:', localObj);
  return localObj;
}

// notMutate({f: 123, g: 456});

//
// First-class and higher-order functions
//

// TODO


//
// PURE FUNCTIONS
// 
// If there is no data dependency between two pure expressions, their order can be reversed, 
// or they can be performed in parallel and they cannot interfere with one another (in other terms, 
// the evaluation of any pure expression is thread-safe).
// 
function pure1 (a,b){
  let rndInt = Math.floor(Math.random() * Math.floor(a));;
  let sqrtB = Math.sqrt(b);
  console.log(rndInt);
  console.log(sqrtB);
} 

// pure1(111,144);

// 
// RECURSION
// 
// Fibonacci example
let entries = 0; 
function fib(x) {
  console.log('entry ', entries++);
  if (x === 0 || x === 1) {
    return x;
  } else {
    return fib(x - 1) + fib(x - 2);
  }
};

console.log(fib(5));
