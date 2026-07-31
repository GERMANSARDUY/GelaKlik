export const SCORE_ICONS = [
    "⚪",
    "🟢",
    "🟡",
    "🔴"
];

export const BONUS_ICONS = [
    "⚪",
    "★",
    "★★",
    "★★★"
];

export const PENALTY_ICONS = [
    "⚪",
    "🟡",
    "🟠",
    "🔴"
];
export function getScoreIcon(type, value) {

    if (type === "bonus") {

        return BONUS_ICONS[value];

    }

    return PENALTY_ICONS[value];

}