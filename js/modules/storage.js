const DB_KEY = "gelaklik-data";

const DEFAULT_DATA = {
    groups: [],
    settings: {},
    selectedGroupId: null
};

export function loadData() {

    const data = localStorage.getItem(DB_KEY);

    if (!data) {
        return structuredClone(DEFAULT_DATA);
    }

    const parsed = JSON.parse(data);

    return {
        ...structuredClone(DEFAULT_DATA),
        ...parsed
    };
}

export function saveData(data) {

    localStorage.setItem(
        DB_KEY,
        JSON.stringify(data)
    );

}