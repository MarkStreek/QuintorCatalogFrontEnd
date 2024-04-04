import React, {useState} from "react";
import {Input, Select, SelectItem} from '@nextui-org/react';
import RootLayout from "@/app/components/RootLayout/RootLayout";
import UseFetch from "@/hooks/UseFetch";

export default function AddDevice() {

    // REACT STATE To store the already used specs
    const [alreadyUsedSpecs, setAlreadyUsedSpecs] = useState([]);
    // REACT STATE To store the selected specs
    const [value, setValue] = useState(new Set([]));
    // REACT STATE To store the new spec that needs to be added to the alreadyUsedSpecs
    const [addNewSpec, setAddNewSpec] = useState({name: "", dataType: ""});
    // REACT STATE To store the device data
    const [DeviceData, setDeviceData] = useState(
        {
            Type: "",
            Merknaam: "",
            Model: "",
            Serienummer: "",
            Factuurnummer: "",
            LocatieNaam: "",
            LocatieStad: "",
            LocatieAdres: "",
            specificaties: [],
                });

    // Call a function that fetches the specs from the API and updates the alreadyUsedSpecs state.
    AlreadyUsedSpecs(alreadyUsedSpecs, setAlreadyUsedSpecs);

    /**
     * Function that handles the change of the specifications.
     * Because the specs are inside an object and in an array,
     * we need to handle the change of the specs differently.
     *
     * We're changing the specs in the DeviceData state realtime.
     * Therefore, we have to check if it already exists or not.
     *
     * @param specName specification name
     * @param specValue specification value
     */
    const handleSpecificationsChange = (specName, specValue) => {
        const specIndex = DeviceData.specificaties.findIndex(spec => Object.keys(spec)[0] === specName);
        if (specIndex !== -1) {
            // Spec already exists, update its value
            const updatedSpecs = [...DeviceData.specificaties];
            updatedSpecs[specIndex][specName] = specValue;
            setDeviceData(prevState => ({
                ...prevState,
                specificaties: updatedSpecs,
            }));
        } else {
            // Spec doesn't exist, add it
            setDeviceData(prevState => ({
                ...prevState,
                specificaties: [
                    ...prevState.specificaties,
                    { [specName]: specValue }
                ]
            }));
        }
    };

    /**
     * Async function that sends a POST request to the API to add a new device.
     * The device data is stored in the DeviceData state and used for the fetch request.
     */
    async function POSTnewDevice() {
        const translatedData = translateKeys(DeviceData, translationMap);
        console.log(translatedData);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(translatedData)
        };
        let response = await fetch('http://localhost:8080/components', requestOptions)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }

    return (
        <RootLayout>
            <h1 className="text-5xl md:mt-0 xs:mt-12 sm:mt-12">Nieuw Apparaat toevoegen</h1>
            <hr className="w-full h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-4 dark:bg-gray-700"/>
            <br/>
            <form onSubmit={POSTnewDevice}>
                <h1 className="text-3xl mb-6">Eigenschappen</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 md:break-after-auto">
                    {Object.keys(DeviceData).map((key) => {
                        if (key === "specificaties") return null;
                        return (
                            <Input
                                key={key}
                                size="md"
                                type="text"
                                variant="bordered"
                                label={key}
                                value={DeviceData[key]}
                                onChange={(e) => setDeviceData({...DeviceData, [key]: e.target.value})}
                                className="mt-2 pr-3 pb-0.5 pt-0.5 relative z-0 w-full"
                            />
                        );
                    })}
                </div>
                <hr className="w-full h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-8 dark:bg-gray-700"/>
                <div>
                    <h1 className="text-3xl mb-6">Technische specificaties</h1>
                    <Select
                        label="Selecteer specificaties"
                        selectionMode="multiple"
                        onSelectionChange={setValue}
                    >
                        {alreadyUsedSpecs.map((spec) => (
                            <SelectItem key={spec}>
                                {spec}
                            </SelectItem>
                        ))}
                    </Select>
                    <p className="text-small ml-2 mt-2 text-default-500">Aantal geselecteerde specificaties: {value.size}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:break-after-auto">
                        {Array.from(value).map((spec) => (
                            <Input
                                key={spec}
                                size="md"
                                type="text"
                                variant="bordered"
                                label={spec}
                                className="mt-2 pr-3 pb-0.5 pt-0.5 relative z-0 w-full"
                                onChange={(e) => handleSpecificationsChange(spec, e.target.value)}
                            />
                        ))}
                    </div>
                </div>
                <button type="submit"
                        className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apparaat opslaan
                </button>
            </form>
            <br/><br/>
            <hr className="w-full h-1 mx-auto my-8 bg-gray-300 border-0 rounded md:my-4 dark:bg-gray-700"/>
            <h1 className="text-3xl mb-6 mt-6">Specificatie toevoegen die nog niet bestaat</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 md:break-after-auto">
                    <Input
                        size="md"
                        type="text"
                        variant="bordered"
                        label="Specificatie naam"
                        placeholder={"b.v. Schermgrootte, RAM"}
                        onChange={(e) => setAddNewSpec({...addNewSpec, ["name"]: e.target.value})}
                        className="p-3 relative z-0"
                    />
                    <Input
                        size="md"
                        type="text"
                        variant="bordered"
                        label="Specificatie type"
                        placeholder={"b.v. String, int, boolean"}
                        onChange={(e) => setAddNewSpec({...addNewSpec, ["dataType"]: e.target.value})}
                        className="p-3 relative z-0"
                    />
                    <Input
                        className="w-44 ml-3"
                        type={"submit"}
                        value={"Specificatie toevoegen"}
                        onClick={() => {
                            setAlreadyUsedSpecs([...alreadyUsedSpecs, addNewSpec.name]);
                            console.log(alreadyUsedSpecs);
                        }}
                    >
                    </Input>
                </div>
        </RootLayout>
    );
}

/**
 * Function that fetches the specs from the API and updates the alreadyUsedSpecs state.
 * @param alreadyUsedSpecs already used specs
 * @param setAlreadyUsedSpecs set already used specs
 * @constructor
 */
function AlreadyUsedSpecs(alreadyUsedSpecs, setAlreadyUsedSpecs) {
    const {data, loading, error} = UseFetch("http://localhost:8080/specs");
    data.map((spec) => {
        if (!alreadyUsedSpecs.includes(spec.name)) {
            setAlreadyUsedSpecs([...alreadyUsedSpecs, spec.name]);
        }
    });
}

/*
Translation map for the keys of the device data.
 */
const translationMap = {
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
function translateKeys(obj, translationMap) {
    const translatedObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const translatedKey = translationMap[key] || key;
            translatedObj[translatedKey] = obj[key];
        }
    }
    return translatedObj;
}
