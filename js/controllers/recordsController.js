import { selectGroup } from "../modules/groupsManager.js";
import { SCORE_ICONS } from "../modules/constants.js";
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
    const buttons = document.querySelectorAll(".scoreButton");

    buttons.forEach(button=>{

        button.onclick = ()=>{

            let value = Number(button.dataset.value);

            value++;

            if(value>3){

                value=0;

            }

            button.dataset.value=value;
button.textContent = SCORE_ICONS[value];

            const date=document.getElementById("recordDate").value;

            setValue(

                Number(button.dataset.group),

                date,

                Number(button.dataset.student),

                Number(button.dataset.criterion),

                value

            );

        };

    });

}