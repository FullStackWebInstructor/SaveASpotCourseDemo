


window.onload = function () {
    loadSpots();
}


function loadSpots() {
    axios.get("/spots/data/all").then((response) => {
        renderSpots(response.data);
    });
}

function renderSpots(data) {

    const container = document.querySelector("#spot-container");

    // remove old posts;
    while (container.firstChild) {
        container.firstChild.remove()
    }

    data.spots.forEach(request => {
        container.appendChild(createEachSpot(request, data.user));
    });
}

function createEachSpot(spot, user) {
    const cardContainer = document.createElement("div");
    cardContainer.className = "card card-custom";
    cardContainer.style = "width: 18rem;";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const requester = createEntry("Requester", spot.requester);
    const reward = createEntry("Reward", spot.award);
    const time = createEntry("Time", spot.time);
    const location = createEntry("Location", spot.location);
    const helper = createEntry("Helper", spot.helper || "None");

    cardBody.appendChild(requester);
    cardBody.appendChild(reward);
    cardBody.appendChild(time);
    cardBody.appendChild(location);
    cardBody.appendChild(helper);

    cardContainer.appendChild(cardBody);

    if (spot.complete) {
        buildCheckMark(cardContainer);
    }

    buildBtn(cardContainer);

    return cardContainer;
}

function buildBtn(domElem) {

}

function buildCheckMark(domElem) {
    const checkMarkIcon = document.createElement('i');
    checkMarkIcon.className = "bi bi-check-circle text-success check-mark-pos";

    domElem.appendChild(checkMarkIcon);
}

function createEntry(key, value) {
    const entry = document.createElement('div');

    const h6 = document.createElement('h6');
    h6.innerText = key;
    h6.className = "card-subtitle";

    const paraDom = document.createElement('p');
    paraDom.innerText = value;
    paraDom.className = "card-text";

    entry.appendChild(h6);
    entry.appendChild(paraDom);

    return entry;
}


function help(id) {
    axios.post("/spots/action/help", {
        id: id
    }).then(() => {
        notify(`successfully help!`)
    }).catch(() => {
        notify(`fail to help`)
    });
}

function complete(id) {
    axios.post("/spots/action/complete", {
        id: id
    }).then(() => {
        notify(`successfully complete!`)
    }).catch(() => {
        notify(`fail to complete`)
    });
}

function notify(message) {
    alert(message);
}

function createRequest() {
    alert("not implemented yet");
}

function logout() {
    alert("not implemented yet");
}