const spaceid = 'nbf7jcn8mztl'
const environmentid = 'master'
const accesstoken = '358a5b67b07990394c3d9b1bdfccfc72e62a70cee0ecee048ed5100a52865765'

const url = `https://cdn.contentful.com/spaces/${spaceid}/environments/${environmentid}/entries?access_token=${accesstoken}`

const pullData = function (){
  return fetch(url)
  .then(response => response.json())
  .then(data => {

    return data.items.map(item => {
      return item.fields
    })
  })
}

pullData().then(data => {
  console.log(data)
})
