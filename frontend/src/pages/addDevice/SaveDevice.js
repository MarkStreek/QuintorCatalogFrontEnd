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
 * Async function that sends a POST request to the API to add a new device.
 * The device data is stored in the DeviceData state and used for the fetch request.
 */
export default async function POSTnewDevice(DeviceData) {
    console.log(JSON.stringify(DeviceData));
    const translatedData = translateKeys(DeviceData, translationMap);
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(translatedData)
    };
    try {
        let response = await fetch('http://localhost:8080/devices', requestOptions)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert(error);
    }


}

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