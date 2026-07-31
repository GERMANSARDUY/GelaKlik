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
   HODEIRA GORDE
   ===================================================== */


export async function saveToCloud() {

    if (!cloudUrl) {
        return false;
    }

    try {

        const data = loadData();

        const response = await fetch(
            cloudUrl,
            {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(data)
            }
        );


        console.log("POST erantzuna:", response);

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
   HODEITIK KARGATU
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
            json.status === "ok" &&
            json.data
        ) {


            saveData(
                json.data
            );


            return true;


        }



        return false;



    } catch(error) {


        console.error(
            "Cloud kargatze errorea:",
            error
        );


        return false;


    }


}