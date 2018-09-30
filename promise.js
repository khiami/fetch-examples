const fetch = require('node-fetch')
const express = require('express')
const app = express()

const port = 7001

const generatePromise = uri=> new Promise((resolve, reject)=>
  fetch(uri)
  .then(res=> res.json())
  .then(res=> resolve(res))
  .catch(err=> reject(err))
)

app.get('/promise', async (req, res, next)=> {

  // scope 1

  const uri = 'https://jsonplaceholder.typicode.com/users'
  const promise = generatePromise(uri)

  return Promise.all([ promise ])
  .then(data=> {

    // scope 2
    const ids = data[0].map(item=> item.id)
    return res.json({ ids })

  })
  .catch(console.log)


})

app.listen(port, _=> console.log( `server listening on localhost:${port}` ))
