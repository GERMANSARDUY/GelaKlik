import { getRecords } from "./recordsManager.js";
import { getCriteria } from "./criteriaManager.js";
import {
    getSelectedEvaluation
} from "./settingsManager.js";


import {
    getEvaluation
} from "./evaluationManager.js";

export function getStudentSummary(groupId, studentId) {

    const criteria = getCriteria();
const selectedEvaluation =
    getSelectedEvaluation();

const evaluation =
    getEvaluation(selectedEvaluation);
    const records = getRecords().filter(r => {

    if (
        r.groupId !== groupId ||
        r.studentId !== studentId
    ) {

        return false;

    }

    if (selectedEvaluation === 0) {

        return true;

    }

    return (
        r.date >= evaluation.start &&
        r.date <= evaluation.end
    );

});

    let bonus = 0;
    let penalty = 0;

    records.forEach(record => {

        Object.entries(record.values).forEach(([criterionId, value]) => {

            const criterion = criteria.find(c => c.id == criterionId);

            if (!criterion) return;

            if (criterion.type === "bonus") {

                bonus += value;

            } else {

                penalty += value;

            }

        });

    });

    return {

        bonus,
        penalty,
        total: bonus - penalty

    };

}
export function getStudentDetails(groupId, studentId) {

    const criteria = getCriteria();

    const records = getRecords().filter(r =>
        r.groupId === groupId &&
        r.studentId === studentId
    );

    const bonus = [];
    const penalty = [];

    criteria.forEach(c => {

        let total = 0;

        records.forEach(record => {

            total += record.values[c.id] ?? 0;

        });

        if (c.type === "bonus") {

           bonus.push({

    id: c.id,
    name: c.name,
    type: c.type,
    value: total

});

        } else {

            penalty.push({

    id: c.id,
    name: c.name,
    type: c.type,
    value: total

});

        }

    });

    const summary = getStudentSummary(groupId, studentId);

    return {

        bonus,
        penalty,

        totalBonus: summary.bonus,
        totalPenalty: summary.penalty,
        total: summary.total

    };

}