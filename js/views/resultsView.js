import {
    getGroups,
    getSelectedGroupId,
    getFirstGroupId,
    selectGroup,
    getGroup
} from "../modules/groupsManager.js";
import {
    getSelectedEvaluation,
    setSelectedEvaluation
} from "../modules/settingsManager.js";
import {
    getStudentSummary
} from "../modules/resultsManager.js";

export function resultsView() {

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
const selectedEvaluation =
    getSelectedEvaluation();
    let html = `

        <h1>Emaitzak</h1>

        <div class="card">

            <label>Taldea</label>

            <br><br>

            <select id="resultsGroupSelect">

                ${groups.map(g => `

                    <option
                        value="${g.id}"
                        ${g.id===selectedId ? "selected" : ""}>

                        ${g.name}

                    </option>

                `).join("")}

            </select>
<br><br>

<label>Ebaluazioa</label>

<br><br>

<select id="evaluationSelect">

    <option
    value="0"
    ${selectedEvaluation == 0 ? "selected" : ""}>

    Ikasturte osoa

</option>

    <option
    value="1"
    ${selectedEvaluation == 1 ? "selected" : ""}>

    1. ebaluazioa

</option>

   <option
    value="2"
    ${selectedEvaluation == 2 ? "selected" : ""}>

    2. ebaluazioa

</option>

   <option
    value="3"
    ${selectedEvaluation == 3 ? "selected" : ""}>

    3. ebaluazioa

</option>

</select>
        </div>

        <br>

    `;

    if (group) {

        html += `

        <div class="card">

            <table class="recordsTable">

                <thead>

    <tr>

        <th data-sort="name">

            Ikaslea

        </th>

        <th data-sort="bonus">

            ⭐

        </th>

        <th data-sort="penalty">

            ⛔

        </th>

        <th data-sort="total">

            Guztira

        </th>

    </tr>

</thead>

                <tbody>

        `;

        group.students.forEach(student => {

            const summary = getStudentSummary(group.id, student.id);

            html += `

                <tr>

                    <td>

    <button
        class="studentButton"
        data-id="${student.id}">

        ${student.name}

    </button>

</td>
                    <td>${summary.bonus}</td>
                    <td>${summary.penalty}</td>
                    <td><strong>${summary.total}</strong></td>

                </tr>

            `;

        });

        html += `

                </tbody>

            </table>

        </div>

        `;
html += `

    <br>

    <div
        id="studentDetails"
        class="card">

        <h2>Ikaslea</h2>

        <p>

            Hautatu ikasle bat bere datuak ikusteko.

        </p>

    </div>

`;
    }

    return html;

}

export function activateResultsView(render) {

    console.log("Ebaluazioa:", getSelectedEvaluation());

    const select =
        document.getElementById("resultsGroupSelect");

    if (!select) return;

    select.onchange = () => {

        selectGroup(Number(select.value));

        render();

    };

    const evaluationSelect =
        document.getElementById("evaluationSelect");

    if (evaluationSelect) {

        evaluationSelect.value =
            getSelectedEvaluation();

        evaluationSelect.onchange = () => {

            setSelectedEvaluation(
                evaluationSelect.value
            );

            render();

        };

    }

}