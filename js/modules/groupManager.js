import { loadData, saveData } from "./storage.js";

export function getGroups() {

    return loadData().groups;

}

export function createGroup(name) {

    const data = loadData();

    data.groups.push({

        id: Date.now(),

        name,

        students: []

    });

    saveData(data);

}

export function getSelectedGroupId() {

    return loadData().selectedGroupId;

}

export function selectGroup(id) {

    const data = loadData();

    data.selectedGroupId = id;

    saveData(data);

}
export function getGroup(id) {

    return getGroups().find(group => group.id === id);

}

export function setStudents(groupId, students) {

    const data = loadData();

    const group = data.groups.find(g => g.id === groupId);

    if (!group) return;

    group.students = students;

    saveData(data);

}
export function renameGroup(id, newName) {

    const data = loadData();

    const group = data.groups.find(g => g.id === id);

    if (!group) return;

    group.name = newName.trim();

    saveData(data);

}

export function deleteGroup(id) {

    const data = loadData();

    data.groups = data.groups.filter(g => g.id !== id);

    if (data.selectedGroupId === id) {

        data.selectedGroupId = null;

    }

    saveData(data);

}