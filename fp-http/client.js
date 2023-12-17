const postUrl = 'http://localhost:3000/records';
const getUrl = 'http://localhost:3000/records/123?firstName=hello&lastName=world';
const headUrl = 'http://localhost:3000/records/123';
const deleteUrl = 'http://localhost:3000/records/123';
const putUrl = 'http://localhost:3000/records/123';
const patchUrl = 'http://localhost:3000/records/123';
const optionsUrl = 'http://localhost:3000/records/123';

async function useFetch() {
  await fetch(getUrl).then(async (r) => {
    console.log(r.body);
    const jsonData = await r.json();
    console.log(jsonData);
  })
}
useFetch();

async function useAxios() {
  const axios = require('axios');
  const res = await axios.get(getUrl)
  console.log(res.data);
}
useAxios();

// TBD other HTTP methods
