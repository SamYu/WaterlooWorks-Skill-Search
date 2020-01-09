const readline = require('readline');
const fs = require('fs');
const path = require('path');

async function getArrOfSkills() {
    const filePath = path.join(__dirname, 'skillsList.txt');
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
    });
    const arr = [];
    for await (const line of rl) {
        arr.push(line);
    }
    return arr;
}

export default async function parseSkillsList(skills) {
    const arrSkills = await getArrOfSkills();
    const skillsList = [];
    arrSkills.forEach((value) => {
        const escapedVal = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (skills.match(new RegExp("\\b" + escapedVal + "\\b")) != null) {
            skillsList.push(value);
        }
    });
    return skillsList;
}
