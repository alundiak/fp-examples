//
// Partial info from ChatGPT:
// HTTP methods/verbs/requests can be cached - in some meaning HTTP methods can be called as PURE, but
// "idempotent" as term related to multiple identical requests which have the same effect as a single request.
// TODO implement some client-server code to show how caching WORKS
// 

const express = require('express');
const app = express();

// Do I really need these?
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// It WORKS anyway

// Since HTTP 0.9
app.get('/records/:id', (req, res, next) => {
  // params: { '0': '/records/123' }, // if app.get('*')
  // params: { id : '/records/123' }, // if app.get('/records/:id'
  // query: { firstName: 'andrii', lasttName: 'lundiak' },
  console.log(req.params);
  console.log(req.query);
  const { id } = req.params;
  const { firstName, lastName } = req.query;

  let responseObject = {};
  if (id) {
    responseObject.id = 'id param received';
  }
  if (firstName) {
    responseObject.firstName = 'firstName query received';
  }
  if (lastName) {
    responseObject.lastName = 'lastName query received';
  }

  // WORKS
  // res.json(responseObject);
  // also WORKS
  res.status(200).send(responseObject);

  next();
  // next(responseObject);
});

// Since HTTP 1.0
app.post('records', (req, res, next) => {
  // TBD
});

// Since HTTP 0.9
app.head('records/:id', (req, res, next) => {
  // TBD
});

// Since HTTP 1.1
app.put('records/:id', (req, res, next) => {
  // TBD
});

// Since HTTP 1.1
app.patch('records/:id', (req, res, next) => {
  // TBD
});

// Since HTTP 1.1
app.delete('records/:id', (req, res, next) => {
  // TBD
});

// Since HTTP 1.1
app.connect('records/:id', (req, res, next) => {
  // TBD
});

// Since HTTP 1.1
app.trace('records/:id', (req, res, next) => {
  // TBD
});

// Since HTTP 1.1
app.options('records/:id', (req, res, next) => {
  // TBD
});

app.listen(3000, () => {
  console.log('HTTP Caching localhost server started')
});
