import { loadData, saveData } from "./storage.js";

export function getRecords() {

    return loadData().records;

}

export function saveRecords(records) {

    const data = loadData();

    data.records = records;

    saveData(data);

}