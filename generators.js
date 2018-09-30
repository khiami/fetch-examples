const fetch = require('node-fetch')
const express = require('express')
const co = require('co')
const app = express()
const port = 7001


// wrapping function that returns a promise
app.get('/generators-option1', co.wrap(function*(req, res, next) {

  const uri = 'https://jsonplaceholder.typicode.com/users'
  const ifetch = yield fetch(uri)
  const json = yield ifetch.json()

  const ids = json.map(item=> item.id)
  return res.json({ ids })

}))


// using the co with a generator function
app.get('/generators-option2', (req, res, next)=> {

  co(function*() {

    const uri = 'https://jsonplaceholder.typicode.com/users'
    const ifetch = yield fetch(uri)
    const json = yield ifetch.json()

    const ids = json.map(item=> item.id)
    return res.json({ ids })

  })

})

function customGenerator(generator) {

  const iterator = generator()

  function iterate(iteration) {
    if ( iteration.done ) return iteration.value
    const promise = iteration.value
    return promise.then(x=> iterate(iterator.next(x)))
  }

  return iterate(iterator.next())

}
customGenerator(function*() {

  const uri = 'https://jsonplaceholder.typicode.com/users'
  const response = yield fetch(uri)
  const json = yield response.json()

  console.log('json: ', json.map(item=> item.id) )
})
.catch(err=> console.log( 'generator catch fn all - err: ', err ))
.then(res=> console.log( 'generator then fn call' ))

// How does co actually work
app.get('/generators-option3', (req, res, next)=> {

  customGenerator(function*() {

    const uri = 'https://jsonplaceholder.typicode.com/users'
    const response = yield fetch(uri)
    const json = yield response.json()

    const ids = json.map(item=> item.id)
    return res.json({ ids })

  })
  .catch(error=> res.status(400).json({ error }))
  .then(res=> console.log( 'generator then fn call' ))

})

// simple and straightforward example of how co handles the promises
co(function *() {
  var a = Promise.resolve(1);
  var b = Promise.resolve(2);
  var c = Promise.resolve(3);
  var res = yield [a, b, c];
  console.log(res);
})

app.listen(port, _=> console.log( `server listening on localhost:${port}` ))
