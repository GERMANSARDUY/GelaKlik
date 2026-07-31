import {
    activateResultsController
} from "./controllers/resultsController.js";
import {
    resultsView,
    activateResultsView
} from "./views/resultsView.js";
import {
    activateRecordsController
} from "./controllers/recordsController.js";
import {
    recordsView
} from "./views/recordsView.js";
import { renderLayout } from "./modules/layout.js";
import {
    settingsView,
    activateSettingsView
} from "./views/settingsView.js";
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
case "settings":
    content = settingsView();
    break;
    case "groups":
        content = groupsView();
        break;

    case "criteria":
        content = criteriaView();
        break;
case "records":
    content = recordsView();
    break;
    case "results":
    content = resultsView();
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
if(currentView==="results"){

    activateResultsView(render);

    activateResultsController(render);

}
if(currentView==="settings"){

    activateSettingsView(render);

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

    currentView = "results";

    render();

};

   buttons[5].onclick = () => {

    currentView = "settings";

    render();

};

}