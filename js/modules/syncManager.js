import {
    loadData,
    saveData
} from "./storage.js";


const CLOUD_KEY = "gelaklik-cloud-url";


let cloudUrl =
    localStorage.getItem(CLOUD_KEY) || "";



export function setCloudUrl(url){

    cloudUrl = url.trim();

    localStorage.setItem(
        CLOUD_KEY,
        cloudUrl
    );

}



export function getCloudUrl(){

    return cloudUrl;

}



export async function pingCloud(){

    if(!cloudUrl)
        return false;


    try{

        const response =
            await fetch(cloudUrl);


        const json =
            await response.json();


        return json.status==="ok";


    }catch(error){

        console.error(error);

        return false;

    }

}




export async function saveToCloud(){


    if(!cloudUrl)
        return false;



    try{


        const data =
            loadData();



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
                JSON.stringify({

                    records:
                    data.records || []

                })

            }
        );



        return true;



    }catch(error){


        console.error(
            "Cloud save:",
            error
        );


        return false;

    }


}




export async function loadFromCloud(){


    if(!cloudUrl)
        return false;



    try{


        const response =
            await fetch(
                cloudUrl+
                "?action=load"
            );



        const json =
            await response.json();



        if(
            json.status==="ok" &&
            json.data
        ){


            const data =
                loadData();



            data.records =
                json.data.records || [];



            saveData(data);



            return true;


        }



        return false;



    }catch(error){


        console.error(
            "Cloud load:",
            error
        );


        return false;

    }


}