const fetch = require('node-fetch')
const express = require('express')
const app = express()

const port = 7001

app.get('/async-await', async (req, res, next)=> {

  // scope 1
  const uri = 'https://jsonplaceholder.typicode.com/users'

  const response = await fetch(uri)
  const json = await response.json()
  const ids = json.map(item=> item.id)

  return res.json( ids )

})

app.listen(port, _=> console.log( `server listening on localhost:${port}` ))
