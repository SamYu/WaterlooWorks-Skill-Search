import skillsList from './skillsList';

export default async function parseSkillsList(skills) {
    const result = [];
    if (!skills) return result;
    skillsList.forEach((value) => {
        const escapedVal = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (skills.match(new RegExp("\\b" + escapedVal + "\\b")) != null) {
            result.push(value);
        }
    });
    return result;
}
