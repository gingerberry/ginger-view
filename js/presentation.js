let slidesContainer = document.getElementById("slides");
let title = document.getElementById("presentation-title");
let video = document.getElementById("video")

function loadPresentation() {
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=33393b76229fd922c018b19ec09cedae");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let presentationID = getPresentationID();

    fetch("http://localhost:8000/ginger/api/v1/presentation/" + presentationID, requestOptions)
        .then(response => response.json())
        .then(function (result) {
            title.textContent = result.name;
            let slides = result.slides;

            for (let i = 0; i < slides.length; i++) {
                let item = getSlideRow(slides[i].title, i, slides[i].start_sec);
                slidesContainer.appendChild(item);
            }
        })
        .catch(error => console.log('error', error));
}

function loadVideoSource() {
    let id = getPresentationID();
    let bucket = "gingerberry";

    let video = document.getElementById('video');
    video.src = "https://" + bucket + ".s3.amazonaws.com/presentation/" + id + "/" + id + ".mp4";
}

function getSlideRow(slideTitle, serialNum, slideTS) {
    let row = document.createElement("tr");

    let numTD = getTD(slideTitle);
    row.appendChild(numTD);

    let imageLink = "<a onclick='displaySlideImage(" + serialNum + ");' id='slide-img-" + serialNum + "'><i class='fas fa-eye'></i></a>";
    let videoJumpLink = "<a onClick='jumpToTimestamp(" + slideTS + ");'><i class='fas fa-play'></i></a>";
    let linkTD = getTD(videoJumpLink + " " + imageLink);
    row.appendChild(linkTD);

    return row;
}

function uploadVideo() {
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=2d126bb440fdf224e21f1b26415fbec1");

    let formdata = new FormData();
    formdata.append("video", pickInput.files[0], extractFilename());

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    let presentationID = getPresentationID();

    fetch("http://localhost:8000/ginger/api/v1/video/" + presentationID, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function getTD(content) {
    let td = document.createElement("td");
    td.innerHTML = content;

    return td;
}

function jumpToTimestamp(sec) {
    video.currentTime = sec;
}

function getPresentationID() {
    let url = new URL(window.location.href);
    let presentationID = url.searchParams.get("presentation");

    return presentationID;
}

loadPresentation();
loadVideoSource();