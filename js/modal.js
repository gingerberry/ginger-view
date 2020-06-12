let modal = document.getElementById("modal");

let modalImg = document.getElementById("modal-image");
let captionText = document.getElementById("caption");

function displaySlideImage(serialNum) {
    modal.style.display = "block";
    let presentationID = getPresentationID();
    let bucket = "gingerberry";

    modalImg.src = "https://" + bucket + ".s3.amazonaws.com/presentation/" + presentationID + "/" + serialNum + ".png";
}

let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}