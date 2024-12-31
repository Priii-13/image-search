const accessKey = "0rOtxiW5WNNJxEzGyNZf1ygKWyfC0G-9lOpakZLpWiQ";
const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const imagesContainer = document.querySelector(".images-container");
const loadMoreBtn = document.querySelector(".loadMoreBtn");


let page = 1;
//fuction to fetch images using unnsplash API

const fetchImages = async (query, pageNo) => {
    if(pageNo===1){
  imagesContainer.innerHTML = "";
    }
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if(data.results.length>0){
  data.results.forEach((photo) => {
    //creating imagediv

    if(data.total_pages===pageNo){
        loadMoreBtn.style.display="none";
    }
    else{
        loadMoreBtn.style.display="block";
    }
    const imagesElement = document.createElement("div");
    imagesElement.classList.add("imageDiv");
    imagesElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

    //creating overlay
    const overlayElement = document.createElement("div");
    overlayElement.classList.add("overlay");

    //creating overlay text
    const overlaytext = document.createElement("h3");
    overlaytext.innerText = `${photo.alt_description}`;

    overlayElement.appendChild(overlaytext);
    imagesElement.appendChild(overlayElement);
    imagesContainer.appendChild(imagesElement);
  }) 
}
else{
    imagesContainer.innerHTML = `<h2>No Image Found</h2>`;
}
}



//adding eventlistener to search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const InputText = searchInput.value.trim();
  if (InputText !== " ") {
    page = 1;
    fetchImages(InputText, page);
  } else {
    imagesContainer.innerHTML = `<h2>Please enter a search query</h2>`;
    if(loadMoreBtn.style.display==="block"){
        loadMoreBtn.style.display="none";
    }

  }
});
loadMoreBtn.addEventListener("click", () => {
  fetchImages(searchInput.value.trim(), ++page);
});
