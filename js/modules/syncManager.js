import {
    loadData,
    saveData
} from "./storage.js";


const CLOUD_KEY = "gelaklik-cloud-url";


let cloudUrl =
    localStorage.getItem(CLOUD_KEY) || "";



/* =====================================================
   CLOUD URL
   ===================================================== */


export function setCloudUrl(url) {

    cloudUrl = url.trim();

    localStorage.setItem(
        CLOUD_KEY,
        cloudUrl
    );

}


export function getCloudUrl() {

    return cloudUrl;

}



/* =====================================================
   KONEXIO PROBA
   ===================================================== */


export async function pingCloud() {

    if (!cloudUrl) {

        return false;

    }


    try {

        const response =
            await fetch(cloudUrl);


        const json =
            await response.json();


        return json.status === "ok";


    } catch(error) {

        console.error(
            "Cloud konexio errorea:",
            error
        );

        return false;

    }

}



/* =====================================================
   HODEIRA GORDE (RECORDS BAKARRIK)
   ===================================================== */


export async function saveToCloud() {


    if (!cloudUrl) {

        return false;

    }


    try {


        const localData =
            loadData();



        // Hodeiko records hartu

        let cloudRecords = [];

        try {

            const response =
                await fetch(
                    cloudUrl +
                    "?action=load"
                );


            const json =
                await response.json();


            if (
                json.status === "ok" &&
                json.data &&
                json.data.records
            ) {

                cloudRecords =
                    json.data.records;

            }

        } catch(error) {

            console.warn(
                "Ez da hodeiko records irakurri:",
                error
            );

        }



        const mergedRecords =
            mergeRecords(
                cloudRecords,
                localData.records || []
            );



        const payload = {

            records:
                mergedRecords

        };



        await fetch(
            cloudUrl,
            {

                method:"POST",

                mode:"no-cors",

                headers:{

                    "Content-Type":
                    "text/plain;charset=utf-8"

                },

                body:
                    JSON.stringify(payload)

            }
        );



        localData.records =
            mergedRecords;


        saveData(
            localData
        );



        return true;



    } catch(error) {


        console.error(
            "Cloud gordetze errorea:",
            error
        );


        return false;

    }

}



/* =====================================================
   HODEITIK KARGATU (RECORDS BAKARRIK)
   ===================================================== */


export async function loadFromCloud() {


    if (!cloudUrl) {

        return false;

    }


    try {


        const response =
            await fetch(
                cloudUrl +
                "?action=load"
            );



        const json =
            await response.json();



        if (
            json.status !== "ok" ||
            !json.data
        ) {

            return false;

        }



        const localData =
            loadData();



        localData.records =
            mergeRecords(
                localData.records || [],
                json.data.records || []
            );



        saveData(
            localData
        );



        return true;



    } catch(error) {


        console.error(
            "Cloud kargatze errorea:",
            error
        );


        return false;

    }

}



/* =====================================================
   RECORDS BATERATU
   ===================================================== */


function mergeRecords(
    baseRecords,
    newRecords
) {


    const result =
        [
            ...baseRecords
        ];



    newRecords.forEach(newRecord => {


        const index =
            result.findIndex(oldRecord =>

                oldRecord.groupId === newRecord.groupId &&
                oldRecord.date === newRecord.date &&
                oldRecord.studentId === newRecord.studentId

            );



        if (index >= 0) {


            result[index] =
                newRecord;


        } else {


            result.push(
                newRecord
            );


        }


    });



    return result;

}