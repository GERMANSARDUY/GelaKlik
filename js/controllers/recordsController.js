import { selectGroup } from "../modules/groupsManager.js";
import {
    getScoreIcon
} from "../modules/constants.js";
import {
    setValue,
    setSelectedDate
} from "../modules/recordsManager.js";

export function activateRecordsController(render){

    const groupSelect = document.getElementById("groupSelect");

    if(groupSelect){

        groupSelect.onchange = ()=>{

            selectGroup(Number(groupSelect.value));

            render();

        };

    }
const dateInput = document.getElementById("recordDate");

if(dateInput){

    dateInput.onchange = ()=>{

        setSelectedDate(dateInput.value);

        render();

    };

}
const previousButton =
    document.getElementById("previousDay");
if(previousButton){

    previousButton.onclick = ()=>{

        const current = new Date(dateInput.value);

        current.setDate(current.getDate() - 1);

        const newDate =
            current.toISOString().split("T")[0];

        setSelectedDate(newDate);

        render();

    };

}
const nextButton =
    document.getElementById("nextDay");
if(nextButton){

    nextButton.onclick = ()=>{

        const current = new Date(dateInput.value);

        current.setDate(current.getDate() + 1);

        const newDate =
            current.toISOString().split("T")[0];

        setSelectedDate(newDate);

        render();

    };

}
const todayButton =
    document.getElementById("todayButton");
    if(todayButton){

    todayButton.onclick = ()=>{

        const today =
            new Date().toISOString().split("T")[0];

        setSelectedDate(today);

        render();

    };

}
    const buttons = document.querySelectorAll(".scoreButton");

    buttons.forEach(button=>{

        button.onclick = ()=>{

    let value = Number(button.dataset.value);

    value++;

    if(value>3){

        value=0;

    }

    button.dataset.value = value;

    button.textContent = getScoreIcon(
        button.dataset.type,
        value
    );

    const date = document.getElementById("recordDate").value;

    setValue(

        Number(button.dataset.group),

        date,

        Number(button.dataset.student),

        Number(button.dataset.criterion),

        value

    );

};   // <-- onclick hemen amaitzen da

    });

}