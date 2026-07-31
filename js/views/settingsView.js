import {
    saveEvaluationsSettings
} from "../modules/settingsManager.js";
import {
    getEvaluations
} from "../modules/evaluationManager.js";
import {
    setCloudUrl,
    getCloudUrl,
    pingCloud,
    saveToCloud,
    loadFromCloud
} from "../modules/syncManager.js";
export function settingsView() {

    const evaluations = getEvaluations();

    return `

<h1>Ezarpenak</h1>

<div class="card">

    <h2>📅 Ebaluazioak</h2>

    ${evaluations
        .filter(e => e.id !== 0)
        .map(e => `

        <h3>${e.name}</h3>

        <label>Hasiera</label>

        <br>

        <input
    class="evaluationStart"
    data-id="${e.id}"
    type="date"
    value="${e.start}">

        <br><br>

        <label>Amaiera</label>

        <br>

        <input
    class="evaluationEnd"
    data-id="${e.id}"
    type="date"
    value="${e.end}">

        <br><br><hr><br>

    `).join("")}
<br>

<button id="saveEvaluations">

    💾 Gorde

</button>
<div class="card">

    <h2>☁️ Sinkronizazioa</h2>

    <label>Cloud helbidea</label>

    <br>

   <input 
    id="cloudUrl"
    type="text"
    value="${getCloudUrl()}"
    placeholder="Itsatsi Google Apps Script helbidea"
    style="width:90%"
>

    <br><br>

   <button id="testCloud">

    🔌 Konexioa probatu

</button>

<br><br>

<button id="saveCloud">

    ⬆️ Hodeira gorde

</button>

<br><br>

<button id="loadCloud">

    ⬇️ Hodeitik kargatu

</button>

</div>
</div>

`;

}

export function activateSettingsView(render) {

    const saveButton =
        document.getElementById("saveEvaluations");

    if (!saveButton) return;

    saveButton.onclick = () => {

        const evaluations =
            getEvaluations().map(e => ({

                id: e.id,
                name: e.name,

                start: document.querySelector(

                    `.evaluationStart[data-id="${e.id}"]`

                ).value,

                end: document.querySelector(

                    `.evaluationEnd[data-id="${e.id}"]`

                ).value

            }));

        saveEvaluationsSettings(evaluations);

        alert("Ezarpenak gordeta.");

        render();

    };
    const cloudButton =
        document.getElementById("testCloud");

const saveCloudButton =
    document.getElementById("saveCloud");


if (saveCloudButton) {


    saveCloudButton.onclick = async () => {


        const saved =
            await saveToCloud();


        if (saved) {

            alert("☁️ Datuak hodeian gordeta.");

        } else {

            alert("❌ Ezin izan dira datuak gorde.");

        }


    };

}




const loadCloudButton =
    document.getElementById("loadCloud");


if (loadCloudButton) {


    loadCloudButton.onclick = async () => {


        const loaded =
            await loadFromCloud();


        if (loaded) {

            alert(
                "⬇️ Datuak hodeitik kargatuta."
            );

            render();


        } else {

            alert(
                "❌ Ezin izan dira datuak kargatu."
            );

        }


    };

}
    if (cloudButton) {

        cloudButton.onclick = async () => {


            const url =
                document.getElementById("cloudUrl").value;


            setCloudUrl(url);


            const connected =
                await pingCloud();


            if (connected) {

                alert("☁️ Konexioa zuzena.");

            } else {

                alert("❌ Ezin izan da konektatu.");

            }

        };

    }
}