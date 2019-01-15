// change elements on scroll
document.addEventListener('scroll', function() {
  const pixels = window.pageYOffset
  const sections = document.querySelectorAll('section.images')
  const client = document.querySelector('div.client h2')
  const desc = document.querySelector('div.desc p')

  sections.forEach(section => {
    if (section.offsetTop - 200 <= pixels){
      client.innerHTML = section.getAttribute('data-client')
      desc.innerHTML = section.getAttribute('data-desc')
      document.body.style.backgroundColor = section.getAttribute('data-bkgrd')
    }
  })
})


// contentful
const body = document.body

const spaceid = 'nbf7jcn8mztl'
const environmentid = 'master'
const accesstoken = '358a5b67b07990394c3d9b1bdfccfc72e62a70cee0ecee048ed5100a52865765'
const url = `https://cdn.contentful.com/spaces/${spaceid}/environments/${environmentid}/entries?access_token=${accesstoken}`

const projectData = function (){
  return fetch(url)
  .then(response => response.json())
  .then(data => {
    return data.items.map(item => {
      item.fields.photoString = item.fields.photos.map(photo => {
        let asset = data.includes.Asset.find(asset => {
          return asset.sys.id == photo.sys.id
        })
  
        let url = asset.fields.file.url
        return url
      }).map(url => `<img src="${url}">`).join("")

      return item.fields
    })

    

  })
}

projectData().then(data => {
  console.log(data)


  data.forEach(item =>{
   body.innerHTML = body.innerHTML + `
   <section class='images' data-client = '${item.client}' data-desc='${item.description}' data-bkgrd='${item.backgroundColor}'>
      <div class='content'>
        ${item.photoString}
      </div>
    </section>
 `
 })
})
