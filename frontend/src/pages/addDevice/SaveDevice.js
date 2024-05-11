/*
Translation map for the keys of the device data.
 */
export const translationMap = {
    Type: "type",
    Merknaam: "brandName",
    Model: "model",
    Serienummer: "serialNumber",
    Factuurnummer: "invoiceNumber",
    LocatieNaam: "locationName",
    LocatieStad: "locationCity",
    LocatieAdres: "locationAddress",
    specificaties: "specs"
};

/**
 * Function that translates the keys of an object using a translation map.
 * This because the backend needs different keys than the frontend.
 *
 * @param obj Object that needs to be translated
 * @param translationMap object with the translation map
 * @returns translatedObj object with translated keys
 */
export function translateKeys(obj, translationMap) {
    const translatedObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const translatedKey = translationMap[key] || key;
            translatedObj[translatedKey] = obj[key];
        }
    }
    return translatedObj;
}