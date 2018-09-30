const fetch = require('node-fetch')

function customGenerator(generator) {

  const iterator = generator()
  const iteration = iterator.next()
  const promise = iteration.value

  promise.then(x=> {
    const secondIterator = iterator.next(x)
    const secondPromise = secondIterator.value
    secondPromise.then(y=> iterator.next(y))
  })

}

customGenerator(function*() {

  const uri = 'https://jsonplaceholder.typicode.com/users'
  const response = yield fetch(uri)
  const json = yield response.json()

  const ids = json.map(item=> item.id)
  console.log( 'ids: ', ids )

})
