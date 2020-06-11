let modal = document.getElementById("modal");

let modalImg = document.getElementById("modal-image");
let captionText = document.getElementById("caption");

function displaySlideImage() {
    modal.style.display = "block";
    let presentationID = getPresentationID();
    modalImg.src = "http://localhost:8000/ginger/api/v1/presentation_image/" + presentationID + "/slide/0";
    captionText.innerHTML = img.alt;
}

let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}