let slidesContainer = document.getElementById("slides");
let title = document.getElementById("presentation-title");

function loadPresentation() {
    let presentation = {
        "id": 1,
        "name": "Презентация за божи кравичките",
        "slides": [
            {
                "id": 1,
                "title": "Начало"
            },
            {
                "id": 2,
                "title": "Какво са божи кравичките"
            },
            {
                "id": 3,
                "title": "Конец"
            }
        ]
    };

    title.textContent = presentation.name;

    let slides = presentation.slides;

    for(let i = 0; i < slides.length; i++) {
        let item = getSlideRow(slides[i].title, slides[i].id);
        slidesContainer.appendChild(item);
    }
}

function getSlideRow(slideTitle, slideID) {
    let row = document.createElement("tr");

    let numTD = getTD(slideTitle);
    row.appendChild(numTD);

    let link = "<a href='slide.html?id=" + slideID + "'>преглед</a>";
    let linkTD = getTD(link);
    row.appendChild(linkTD);

    return row;
}

function getTD(content) {
    let td = document.createElement("td");
    td.innerHTML = content;

    return td;
}

loadPresentation();