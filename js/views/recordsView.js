import {
    getGroups,
    getGroup,
    getSelectedGroupId,
    selectGroup,
    getFirstGroupId
} from "../modules/groupsManager.js";
import {
    getScoreIcon
} from "../modules/constants.js";
import {
    getCriteria
} from "../modules/criteriaManager.js";
import {
    getValue,
    getSelectedDate
} from "../modules/recordsManager.js";
export function recordsView() {

    const groups = getGroups();
    const criteria = getCriteria();

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

    const today =
    getSelectedDate() ??
    new Date().toISOString().split("T")[0];

    let html = `

        <h1>Erregistroak</h1>

        <div class="card">

            <label>Taldea</label>

            <br><br>

            <select id="groupSelect">

                ${groups.map(g=>`

                    <option
                        value="${g.id}"
                        ${g.id===selectedId?"selected":""}>

                        ${g.name}

                    </option>

                `).join("")}

            </select>

            <br><br>

            <label>Data</label>

            <br><br>

           <button
    id="previousDay"
    type="button">

    ◀

</button>

<input
    id="recordDate"
    type="date"
    value="${today}">

<button
    id="nextDay"
    type="button">

    ▶

</button>

<button
    id="todayButton"
    type="button">

    Gaur

</button>

</div>

        <br>

        <div class="card">

            <table class="recordsTable">

                <thead>

                    <tr>

                        <th>Ikaslea</th>

                        ${criteria.map(c => `

    <th>${c.name}</th>

`).join("")}

                    </tr>

                </thead>

                <tbody>
    `;

    if(group){

        group.students.forEach(student=>{

            html+=`

                <tr>

                    <td>${student.name}</td>

                   ${criteria.map(c => {

    const value = getValue(
        group.id,
        today,
        student.id,
        c.id
    );


    return `

        <td>

            <button
                class="scoreButton"
                data-group="${group.id}"
                data-student="${student.id}"
                data-criterion="${c.id}"
data-type="${c.type}"
                data-value="${value}">

                ${getScoreIcon(c.type, value)}

            </button>

        </td>

    `;

}).join("")}

                </tr>

            `;

        });

    }

    html+=`

                </tbody>

            </table>

        </div>

    `;

    return html;

}