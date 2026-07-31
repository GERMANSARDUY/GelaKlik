const DB_KEY = "gelaklik-data";

const DEFAULT_DATA = {
    groups: [],
    criteria: [],
    records: [],
   settings: {

    evaluations: [

        {
            id: 1,
            name: "1. ebaluazioa",
            start: "2026-09-08",
            end: "2026-12-18"
        },

        {
            id: 2,
            name: "2. ebaluazioa",
            start: "2027-01-07",
            end: "2027-03-26"
        },

        {
            id: 3,
            name: "3. ebaluazioa",
            start: "2027-04-12",
            end: "2027-06-18"
        }

    ]

},
    selectedGroupId: null,
    selectedDate: null,
    selectedEvaluation: 0
};

export function loadData() {

    const data = localStorage.getItem(DB_KEY);

    if (!data) {

        return structuredClone(DEFAULT_DATA);

    }

    const parsed = JSON.parse(data);

    const merged = {

    ...structuredClone(DEFAULT_DATA),

    ...parsed

};

if (!merged.settings.evaluations) {

    merged.settings.evaluations =
        structuredClone(
            DEFAULT_DATA.settings.evaluations
        );

}

return merged;

}

export function saveData(data) {

    localStorage.setItem(

        DB_KEY,

        JSON.stringify(data)

    );

}