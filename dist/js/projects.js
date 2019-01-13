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
