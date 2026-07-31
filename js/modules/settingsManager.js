import {
    loadData,
    saveData
} from "./storage.js";

export function getSelectedEvaluation() {

    return loadData().selectedEvaluation;

}

export function setSelectedEvaluation(evaluation) {

    console.log("Gordetzen:", evaluation);

    const data = loadData();

    data.selectedEvaluation = Number(evaluation);

    saveData(data);

}
export function getEvaluationsSettings() {

    return loadData().settings.evaluations;

}

export function saveEvaluationsSettings(evaluations) {

    const data = loadData();

    data.settings.evaluations = evaluations;

    saveData(data);

}
