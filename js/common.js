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

function getFileExtension(fileName) {
    let chunks = fileName.split(".");
    return chunks[chunks.length - 1];
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

function writeToErrorBox(message) {
    let errorBox = document.getElementById("error-box");
    errorBox.style.display = "block";
    errorBox.textContent = message;
}

function hideErrorBox() {
    let errorBox = document.getElementById("error-box");
    errorBox.style.display = "none";
}

togglePickBox();