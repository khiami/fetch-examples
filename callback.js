const fetch = require('node-fetch')
const express = require('express')
const app = express()

const port = 7001

app.get('/callback', (req, res, next)=> {

  // scope 1
  const uri = 'https://jsonplaceholder.typicode.com/users'

  fetch(uri)
  .then(data=> data.json())
  .then(data=> {
    
    // scope 2

    const ids = data.map(item=> item.id)
    res.json({ ids })

  })
  .catch(console.log)

  // whatever is defined at this point cannot be used in scope 2

})

app.listen(port, _=> console.log( `server listening on localhost:${port}` ))
