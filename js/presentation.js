let slidesContainer = document.getElementById("slides");
let title = document.getElementById("presentation-title");
let video = document.getElementById("video")

function loadPresentation() {
    let presentation = {
        "id": 1,
        "name": "Презентация за божи кравичките",
        "slides": [
            {
                "id": 1,
                "title": "Начало",
                "startTime": 0,
            },
            {
                "id": 2,
                "title": "Какво са божи кравичките",
                "startTime": 10,
            },
            {
                "id": 3,
                "title": "Конец",
                "startTime": 23,
            },
        ]
    };

    title.textContent = presentation.name;

    let slides = presentation.slides;

    for(let i = 0; i < slides.length; i++) {
        let item = getSlideRow(slides[i].title, slides[i].id, slides[i].startTime);
        slidesContainer.appendChild(item);
    }
}

function getSlideRow(slideTitle, slideID, slideTS) {
    let row = document.createElement("tr");

    let numTD = getTD(slideTitle);
    row.appendChild(numTD);

    let imageLink = "<a onClick='displaySlideImage();'><i class='fas fa-eye'></i> Изображение</a>";
    let videoJumpLink = "<a onClick='jumpToTimestamp(" + slideTS + ");'><i class='fas fa-play'></i> Видео</a>";
    let linkTD = getTD(videoJumpLink + " " + imageLink);
    row.appendChild(linkTD);

    return row;
}

function getTD(content) {
    let td = document.createElement("td");
    td.innerHTML = content;

    return td;
}

function jumpToTimestamp(sec) {
    video.currentTime = sec;
}

loadPresentation();