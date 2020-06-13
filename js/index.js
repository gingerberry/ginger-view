function loadPresentations() {
  let presentationList = document.getElementById("presentation-list");

  let myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=33393b76229fd922c018b19ec09cedae");

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://" + host + ":" + bottomPort + "/gingerberry/ginger/api/v1/recentPresentations", requestOptions)
    .then(response => response.json())
    .then(function (result) {
      let presentations = result.presentations;

      for (let i = 0; i < presentations.length; i++) {
        let item = getPresentationItem(presentations[i].name, presentations[i].id);
        presentationList.appendChild(item);
      }
    })
    .catch(error => console.log('error', error));
}

function getPresentationItem(name, id) {
  let item = document.createElement("div");
  item.className = "card center presentation";

  let title = document.createElement("div");
  title.className = "col presentation-title";
  item.appendChild(title);

  title.textContent = name;

  let view = document.createElement("div");
  view.className = "col presentation-view";
  item.appendChild(view);

  let link = "presentation.html?presentation=" + id;
  view.innerHTML = "<a href='" + link + "' class='btn'><i class='fa fa-eye' aria-hidden='true'></i> Преглед</a>";

  return item;
}

function uploadPresentation() {
  let fileName = extractFilename();
  let extension = getFileExtension(fileName);

  if (extension != "pptx") {
    writeToErrorBox("Очаквахме да получим .pptx, но получихме ." + extension + " файл.");

    // Return to initial state.
    togglePickBox();
    return;
  } else {
    hideErrorBox();
  }

  let loadBox = document.getElementById("wait-box");
  loadBox.style.display = "block";

  let formdata = new FormData();
  formdata.append("presentation", pickInput.files[0], fileName);

  let requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("http://" + host + ":" + topPort + "/gingerberry/api/v1/presentation", requestOptions)
    .then(function (response) {
      if (response.ok) {
        return response.json()
      } else {
        alert("We pooped");
      }
    })
    .then(result => window.location.replace("presentation.html?presentation=" + result.id))
    .catch(error => console.log('error', error));
}

loadPresentations();