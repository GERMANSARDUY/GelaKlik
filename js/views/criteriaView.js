import {
    getCriteria,
    createCriterion,
    deleteCriterion
} from "../modules/criteriaManager.js";
export function criteriaView() {

    const criteria = getCriteria();

    return `

        <h1>Irizpideak</h1>

        <div class="card">

            <input
                id="criterionName"
                type="text"
                placeholder="Irizpidearen izena">

            <br><br>

            <select id="criterionType">

                <option value="penalty">
                    Penalizazioa
                </option>

                <option value="bonus">
                    Bonifikazioa
                </option>

            </select>

            <br><br>

            <button id="newCriterion">

                ➕ Irizpidea gehitu

            </button>

        </div>

        <br>

        <div id="criteriaList">

            ${
                criteria.length===0
                ?
                "<p>Oraindik ez dago irizpiderik.</p>"
                :
                criteria.map(c=>`

<div class="group-card">

    <div class="group-header">

        <strong>${c.name}</strong>

        <button
            class="deleteCriterion"
            data-id="${c.id}">

            🗑️

        </button>

    </div>

    <br>

    ${c.type==="bonus"
        ? "⭐ Bonifikazioa"
        : "⛔ Penalizazioa"}

                    </div>

                `).join("")
            }

        </div>

    `;

}
export function activateCriteriaView(render){

    const button=document.getElementById("newCriterion");

    if(!button) return;

    button.onclick=()=>{

        const name=document
            .getElementById("criterionName")
            .value
            .trim();

        if(name===""){

            alert("Idatzi irizpidearen izena.");

            return;

        }

        const type=document
            .getElementById("criterionType")
            .value;

        createCriterion({

            name,
            type,
            maxValue:3

        });

        render();

    };
document
    .querySelectorAll(".deleteCriterion")
    .forEach(button=>{

        button.onclick=(event)=>{

            event.stopPropagation();

            if(!confirm("Irizpidea ezabatu?"))
                return;

            deleteCriterion(Number(button.dataset.id));

            render();

        };

    });
}