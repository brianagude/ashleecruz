const projects = document.querySelector('section.projects div')

const spaceid = 'nbf7jcn8mztl'
const environmentid = 'master'
const accesstoken = '358a5b67b07990394c3d9b1bdfccfc72e62a70cee0ecee048ed5100a52865765'
const url = `https://cdn.contentful.com/spaces/${spaceid}/environments/${environmentid}/entries?access_token=${accesstoken}`

const projectData = function (){
  return fetch(url)
  .then(response => response.json())
  .then(data => {
    return data.items.map(item => {
      item.fields.photoUrls = item.fields.photos.map(photo => {
        let asset = data.includes.Asset.find(asset => {
          return asset.sys.id == photo.sys.id
        })

        let url = asset.fields.file.url
        return url
      })

      return item.fields
    })



  })
}

projectData().then(data => {
  console.log(data)

  data.forEach(item =>{
   projects.innerHTML = projects.innerHTML + `
    <a href='show.html'>
      ${item.client}
      <img src='${item.photoUrls[0]}'>
    </a>
 `
 })
})
