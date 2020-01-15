// eslint-disable-next-line import/prefer-default-export
export function getWorkTerm() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    if (month >= 0 && month <= 3) {
        return `Spring ${year}`;
    } if (month >= 4 && month <= 7) {
        return `Fall ${year}`;
    } if (month >= 8 && month <= 11) {
        return `Winter ${year}`;
    }
    return year.toString();
}

const objectZip = (keys, values) => (
    keys.reduce(
        (others, key, index) => ({
            ...others,
            [key]: values[index],
        }),
        {},
    ));


export const objectPromise = async (obj) => (
    objectZip(Object.keys(obj), await Promise.all(Object.values(obj))));
