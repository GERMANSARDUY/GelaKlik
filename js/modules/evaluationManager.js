import { loadData } from "./storage.js";
export function getEvaluations() {

    return loadData().settings.evaluations;

}
export function getEvaluation(id) {

    return getEvaluations().find(
        evaluation => evaluation.id === Number(id)
    );

}