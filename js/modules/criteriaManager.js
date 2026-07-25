const STORAGE_KEY = "gelaklik_criteria";

export function getCriteria() {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];

}

export function saveCriteria(criteria) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(criteria)
    );

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

    const criteria = getCriteria().filter(c => c.id !== id);

    saveCriteria(criteria);

}