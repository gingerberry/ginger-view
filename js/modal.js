let modal = document.getElementById("modal");

let modalImg = document.getElementById("modal-image");
let captionText = document.getElementById("caption");

function displaySlideImage() {
    modal.style.display = "block";
    modalImg.src = "https://placekitten.com/600/600";
    //captionText.innerHTML = img.alt;
}

let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}