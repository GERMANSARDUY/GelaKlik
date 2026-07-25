import {
    getGroups,
    getGroup,
    getSelectedGroupId,
    selectGroup,
    getFirstGroupId
} from "../modules/groupsManager.js";

export function recordsView() {

    const groups = getGroups();

    let selectedId = getSelectedGroupId();

    if (selectedId === null) {

        selectedId = getFirstGroupId();

        if (selectedId !== null) {

            selectGroup(selectedId);

        }

    }

    const group = selectedId
        ? getGroup(selectedId)
        : null;

    const today = new Date().toISOString().split("T")[0];

    return `

        <h1>Erregistroak</h1>

        <div class="card">

            <label>Taldea</label>

            <br><br>

            <select id="groupSelect">

                ${groups.map(g=>`

                    <option
                        value="${g.id}"
                        ${g.id===selectedId ? "selected":""}>

                        ${g.name}

                    </option>

                `).join("")}

            </select>

            <br><br>

            <label>Data</label>

            <br><br>

            <input
                id="recordDate"
                type="date"
                value="${today}">

        </div>

        <br>

        <div class="card">

            <h2>Ikasleak</h2>

            ${
                !group || group.students.length===0

                ?

                "<p>Ez dago ikaslerik.</p>"

                :

                `<ul>

                    ${group.students.map(student=>`

                        <li>${student}</li>

                    `).join("")}

                </ul>`

            }

        </div>

    `;

}

export function activateRecordsView(render){

    const select = document.getElementById("groupSelect");

    if(!select) return;

    select.onchange = ()=>{

        selectGroup(Number(select.value));

        render();

    };

}