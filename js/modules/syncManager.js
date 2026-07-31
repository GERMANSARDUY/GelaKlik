import {
    loadData,
    saveData
} from "./storage.js";

let cloudUrl = "";

export function setCloudUrl(url) {

    cloudUrl = url.trim();

}

export function getCloudUrl() {

    return cloudUrl;

}

export async function pingCloud() {

    if (!cloudUrl) {

        return false;

    }

    try {

       const response = await fetch(cloudUrl, {
    method: "GET",
    mode: "cors"
});

        const json = await response.json();

        return json.status === "ok";

    } catch {

        return false;

    }

}