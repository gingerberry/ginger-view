let pickBox = document.getElementById("pick-box");
let pickInput = document.getElementById("pick-input");
let submitBox = document.getElementById("submit-box");
let pickedFileNameBox = document.getElementById("picked-file-name-box");

function extractFilename() {
  let fullPath = pickInput.value;
  let startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
  let filename = fullPath.substring(startIndex);

  if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
    filename = filename.substring(1);
  }

  return filename;
}

function toggleSubmitBox() {
  let fileName = extractFilename();
  pickedFileNameBox.textContent = "Избран файл: " + fileName;

  submitBox.style.display = "block";
}

function togglePickBox() {
  pickBox.style.display = "block";
  submitBox.style.display = "none";
}

function loadPresentations() {
  let presentationList = document.getElementById("presentation-list");

  for (let i = 0; i < 3; i++) {
    let item = getPresentationItem();
    presentationList.appendChild(item);
  }
}

function getPresentationItem() {
  let item = document.createElement("div");
  item.className = "card center presentation";

  let title = document.createElement("div");
  title.className = "col presentation-title";
  item.appendChild(title);

  title.textContent = "New Title";

  let view = document.createElement("div");
  view.className = "col presentation-view";
  item.appendChild(view);

  view.innerHTML = "<a class='btn'><i class='fa fa-eye' aria-hidden='true'></i> Преглед</a>";

  return item;
}

function uploadPresentation() {
  let formdata = new FormData();
  formdata.append("presentation", pickInput.files[0], extractFilename());

  let requestOptions = {
    method: 'POST',
    mode: 'no-cors',
    body: formdata,
    redirect: 'follow'
  };

  fetch("http://localhost:9090/gingerberry/api/v1/presentation", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

togglePickBox();
loadPresentations();