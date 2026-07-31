import { getSelectedGroupId } from "../modules/groupsManager.js";
import { getStudentCriterionHistory } from "../modules/recordsManager.js";
import {
    getSelectedEvaluation,
    setSelectedEvaluation
} from "../modules/settingsManager.js";
import {
    getStudentDetails
} from "../modules/resultsManager.js";
export function activateResultsController(render) {

    document
        .querySelectorAll(".studentButton")
        .forEach(button => {

            button.onclick = () => {

                const panel =
    document.getElementById("studentDetails");

const groupId = getSelectedGroupId();

const studentId = Number(button.dataset.id);

const details =
    getStudentDetails(groupId, studentId);

panel.innerHTML = `

    <h2>${button.textContent}</h2>

    <h3>⭐ Bonifikazioak</h3>

    <table class="studentDetailsTable">

        ${details.bonus.map(item=>`

            <tr>

                <td>

    <button
        class="criterionDetailButton"
        data-student="${studentId}"
        data-criterion="${item.id}">

        ${item.name}

    </button>

</td>

                <td>${item.value}</td>

            </tr>

        `).join("")}

    </table>

    <br>

    <h3>⛔ Penalizazioak</h3>

    <table class="studentDetailsTable">

        ${details.penalty.map(item=>`

            <tr>

                <td>

    <button
        class="criterionDetailButton"
        data-student="${studentId}"
        data-criterion="${item.id}">

        ${item.name}

    </button>

</td>

                <td>${item.value}</td>

            </tr>

        `).join("")}

    </table>

    <div class="studentTotals">

        <p>

            <span>⭐ Bonifikazioak</span>

            <strong>${details.totalBonus}</strong>

        </p>

        <p>

            <span>⛔ Penalizazioak</span>

            <strong>${details.totalPenalty}</strong>

        </p>

        <p>

            <span>GUZTIRA</span>

            <strong>${details.total}</strong>

        </p>

    </div>
<hr>

<h3>Historia</h3>

<div id="criterionHistory">

    Hautatu irizpide bat bere historia ikusteko.

</div>
`;
panel
    .querySelectorAll(".criterionDetailButton")
    .forEach(button => {

        button.onclick = () => {
const groupId = getSelectedGroupId();
           const history = getStudentCriterionHistory(

    groupId,
    Number(button.dataset.student),
    Number(button.dataset.criterion)

);

const historyPanel =
    document.getElementById("criterionHistory");

historyPanel.innerHTML = history.length
    ? history.map(item => `

        <p>

            📅 ${item.date}

            <strong style="float:right">${item.value}</strong>

        </p>

    `).join("")
    : "<p>Ez dago erregistrorik.</p>";

        };

    });

            };

        });

}