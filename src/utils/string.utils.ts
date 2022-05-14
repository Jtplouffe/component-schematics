export function toSingular(value: string, lowerCase = false): string {
    const toReturn = lowerCase ? value.toLowerCase() : value;
    if (toReturn.endsWith("ies")) return toReturn.slice(0, -3) + "y";
    if (toReturn.endsWith("s")) return toReturn.slice(0, -1);
    return toReturn;
}
