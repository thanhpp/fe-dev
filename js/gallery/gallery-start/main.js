const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const files = ['./images/pic1.jpg', './images/pic2.jpg', './images/pic3.jpg', './images/pic4.jpg', './images/pic5.jpg'];

/* Declaring the alternative text for each image file */

/* Looping through images */
for (f of files) {
    var newImg = document.createElement("img");
    newImg.setAttribute("src", `${f}`);
    newImg.setAttribute("alt", `alt text`);

    thumbBar.appendChild(newImg);
}


/* Event listener */
thumbBar.addEventListener("click", (e) => {
    // console.log(e.target);
    displayedImage.setAttribute('src', e.target.getAttribute('src'));
})


/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", () => {
    switch (btn.className) {
        case 'light':
            btn.className = 'dark';
            btn.textContent = 'Darken';
            overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
            break;
        case 'dark':
            btn.className = 'light';
            btn.textContent = 'Lighten';
            overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
            break;
    };
    console.log(btn);
})
