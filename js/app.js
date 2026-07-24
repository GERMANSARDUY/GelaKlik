import { renderLayout } from "./modules/layout.js";

import { homeView } from "./views/homeView.js";

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

        default:
            content = homeView();

    }

    app.innerHTML = renderLayout(content);

    connectMenu();

    if (currentView === "groups") {

        activateGroupsView(render);

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

}