import {
    getGroups,
    createGroup,
    getSelectedGroupId,
    selectGroup,
    getGroup,
    setStudents,
    renameGroup,
    deleteGroup
} from "../modules/groupsManager.js";

export function groupsView() {

    const groups = getGroups();
    const selectedId = getSelectedGroupId();

    let html = `
        <h1>Taldeak</h1>

        <div class="group-toolbar">

            <input
                id="newGroupName"
                type="text"
                placeholder="Taldearen izena">

            <button id="saveGroup">
                Taldea sortu
            </button>

        </div>

        <div id="groupList">
    `;

    if (groups.length === 0) {

        html += `<p>Ez dago talderik.</p>`;

    } else {

        groups.forEach(group => {

            html += `

            <div
               class="group-card ${group.id===selectedId?"selected":""}"
                data-id="${group.id}">

            <div class="group-header">

                 <strong>

                     👥 ${group.name}

                 </strong>

                  <div class="group-actions">

                      <button
                          class="rename-group"
                         data-id="${group.id}">

                ✏️

            </button>

            <button
                class="delete-group"
                data-id="${group.id}">

                🗑️

            </button>   
        
            </div>
             </div>

    <div class="group-info">

        ${group.students.length} ikasle

    </div>
            </div>

            `;

        });

    }

    html += "</div>";
const selected = groups.find(g => g.id === selectedId);

if (selected) {

    html += `

        <hr style="margin:30px 0;">

        <h2>${selected.name}</h2>

        <h3>Ikasleak</h3>

        <textarea
            id="studentsText"
            rows="12"
            style="width:100%;"
            placeholder="Ikasle bat lerro bakoitzean">${selected.students
    .map(student => student.name)
    .join("\n")}</textarea>

        <br><br>

        <button id="saveStudents">

            Ikasleen zerrenda gorde

        </button>

    `;

}
    return html;

}

export function activateGroupsView(refresh) {

    const saveGroupButton = document.getElementById("saveGroup");

    saveGroupButton.onclick = () => {

        const input = document.getElementById("newGroupName");

        const name = input.value.trim();

        if (name === "") {

            alert("Idatzi taldearen izena.");

            return;

        }

        createGroup(name);

        refresh();

    };

    document
        .querySelectorAll(".group-card")
        .forEach(card => {

            card.onclick = () => {

                selectGroup(Number(card.dataset.id));

                refresh();

            };

        });

    const saveStudentsButton = document.getElementById("saveStudents");

    if (saveStudentsButton) {

        saveStudentsButton.onclick = () => {

            const id = getSelectedGroupId();

            const text = document
                .getElementById("studentsText")
                .value;

            const students = text
                .split("\n")
                .map(s => s.trim())
                .filter(s => s !== "");

            setStudents(id, students);

            refresh();

        };

    }
document
    .querySelectorAll(".delete-group")
    .forEach(button => {

        button.onclick = (event) => {

            event.stopPropagation();

            const id = Number(button.dataset.id);

            const group = getGroup(id);

            const answer = confirm(

                `"${group.name}" taldea ezabatu nahi duzu?\n\n` +
                "Ikasle guztiak ere ezabatuko dira."

            );

            if (!answer) return;

            deleteGroup(id);

            refresh();

        };

    });
}