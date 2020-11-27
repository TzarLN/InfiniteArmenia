const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


//Unsplash API
const count = 30;
const apiKey = 'X7F7KkHPA3ealtwE_kIrp_AACQpH1gPMXj2OrbegEDk'; 
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=armenia`;
//Helper Function to Set Attributes on DOM elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}
//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}
//Create Elements for links and photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run func For Each object in ~photos array
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
           href: photo.links.html,
           target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        //Event Listener, check when each if finished loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json();
        displayPhotos();
       
    } catch(error) {

    }
}

//Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})


// On Load
getPhotos();