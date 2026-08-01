import { loadData, saveData } from "./storage.js";

import {
    saveToCloud
} from "./syncManager.js";



function autoCloudSave() {

    setTimeout(() => {

        saveToCloud();

    }, 2000);

}



export function getRecords() {

    return loadData().records;

}



export function saveRecords(records) {

    const data = loadData();

    data.records = records;

    saveData(data);

    autoCloudSave();

}



export function getRecord(groupId, date, studentId) {

    return getRecords().find(record =>

        record.groupId === groupId &&
        record.date === date &&
        record.studentId === studentId

    );

}



export function createRecord(groupId, date, studentId) {

    const records = getRecords();

    const record = {

        groupId,
        date,
        studentId,

        values: {}

    };


    records.push(record);


    saveRecords(records);


    return record;

}



export function setValue(
    groupId,
    date,
    studentId,
    criterionId,
    value
) {


    const records = getRecords();



    let record = records.find(r =>

        r.groupId === groupId &&
        r.date === date &&
        r.studentId === studentId

    );



    if (!record) {


        record = {

            groupId,
            date,
            studentId,
            values:{}

        };


        records.push(record);


    }



    record.values[criterionId] = value;



    saveRecords(records);


}



export function getValue(
    groupId,
    date,
    studentId,
    criterionId
) {


    const record =
        getRecord(
            groupId,
            date,
            studentId
        );


    if (!record)
        return 0;


    return record.values[criterionId] ?? 0;


}



export function getSelectedDate(){

    return loadData().selectedDate;

}



export function setSelectedDate(date){

    const data = loadData();

    data.selectedDate = date;

    saveData(data);

}



export function getStudentCriterionHistory(
    groupId,
    studentId,
    criterionId
) {


    return getRecords()

        .filter(record =>

            record.groupId === groupId &&
            record.studentId === studentId &&
            (record.values[criterionId] ?? 0) > 0

        )

        .map(record => ({

            date: record.date,
            value: record.values[criterionId]

        }))

        .sort((a,b)=>

            a.date.localeCompare(b.date)

        );

}