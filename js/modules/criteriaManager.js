import { loadData, saveData } from "./storage.js";

export function getCriteria() {

    return loadData().criteria;

}

export function saveCriteria(criteria) {

    const data = loadData();

    data.criteria = criteria;

    saveData(data);

}

export function createCriterion(data) {

    const criteria = getCriteria();

    criteria.push({

        id: Date.now(),

        name: data.name,

        type: data.type,

        maxValue: data.maxValue

    });

    saveCriteria(criteria);

}

export function deleteCriterion(id){

    const criteria =
        getCriteria().filter(c => c.id !== id);

    saveCriteria(criteria);

}