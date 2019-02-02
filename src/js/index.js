// dropdown sentence
const button = document.querySelectorAll("div.list");
const list = document.querySelectorAll("div.button");
const projectLinks = document.querySelectorAll("section.projects div");
const ashlee = document.querySelector("div.ashlee img");

$(button).on("mouseenter", function() {
  $(list).css("display", "inline");
  $(projectLinks).css("opacity", "0.1");
  $(ashlee).css("opacity", "1");
});

$(button).on("mouseout", function() {
  $(list).css("display", "none");
  $(projectLinks).css("opacity", "1");
  $(ashlee).css("opacity", "0");
});

$(button).on("touchstart", function() {
  $(list).css("display", "inline");
  $(projectLinks).css("opacity", "0.1");
  $(ashlee).css("opacity", "1");
});

$(button).on("touchend", function() {
  $(list).css("display", "none");
  $(projectLinks).css("opacity", "1");
  $(ashlee).css("opacity", "0");
});

// contentful
const projects = document.querySelector("section.projects div");

const spaceid = "nbf7jcn8mztl";
const environmentid = "master";
const accesstoken =
  "358a5b67b07990394c3d9b1bdfccfc72e62a70cee0ecee048ed5100a52865765";
const url = `https://cdn.contentful.com/spaces/${spaceid}/environments/${environmentid}/entries?access_token=${accesstoken}&order=-sys.createdAt&content_type=clientName`;

const projectData = function() {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      return data.items.map(item => {
        item.fields.photoUrls = item.fields.photos.map(photo => {
          let asset = data.includes.Asset.find(asset => {
            return asset.sys.id == photo.sys.id;
          });

          let url = asset.fields.file.url;
          return url;
        });

        return item.fields;
      });
    });
};

projectData().then(data => {
  console.log(data);

  data.forEach(item => {
    projects.innerHTML =
      projects.innerHTML +
      `<a href='show.html#${item.client.toLowerCase().replace(" ", "-")}'>
      ${item.client}
      <img src='${item.photoUrls[0]}'>
      </a>`;
  });
});
