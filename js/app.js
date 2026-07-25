import {
    activateRecordsController
} from "./controllers/recordsController.js";
import {
    recordsView
} from "./views/recordsView.js";
import { renderLayout } from "./modules/layout.js";

import { homeView } from "./views/homeView.js";
import {
    criteriaView,
    activateCriteriaView
} from "./views/criteriaView.js";

import {
    groupsView,
    activateGroupsView
} from "./views/groupsView.js";

const app = document.getElementById("app");

let currentView = "home";

render();

function render() {

    let content = "";

    switch (currentView) {

    case "groups":
        content = groupsView();
        break;

    case "criteria":
        content = criteriaView();
        break;
case "records":
    content = recordsView();
    break;
    default:
        content = homeView();

}

    app.innerHTML = renderLayout(content);

    connectMenu();

    if (currentView === "groups") {

        activateGroupsView(render);

    }
if(currentView==="criteria"){

    activateCriteriaView(render);

}

if(currentView==="records"){

    activateRecordsController(render);

}
}

function connectMenu() {

    const buttons = document.querySelectorAll(".menu button");

    buttons[0].onclick = () => {

        currentView = "home";
        render();

    };

    buttons[1].onclick = () => {

        currentView = "groups";
        render();

    };

    buttons[2].onclick = () => {

        currentView = "criteria";
        render();

    };

    buttons[3].onclick = ()=>{

    currentView="records";

    render();

};

    buttons[4].onclick = () => {

        alert("Laster erabilgarri.");

    };

    buttons[5].onclick = () => {

        alert("Laster erabilgarri.");

    };

}