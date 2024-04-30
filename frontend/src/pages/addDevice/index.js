/*
* This file render the AddDevice page.
* The AddDevice page is the page where the user can add a new device to the database.
* The page is split into more components:
*   - CreateSpecificationInput.js: The component where the user can select specifications and add values to them.
*   - AddNewSpecification.js: The component where the user can add a new specification that does not exist yet.
*   - SaveDevice.js: The function that sends the device data to the API.
*/

import React, {useState} from "react";
import {Input, Select, SelectItem} from '@nextui-org/react';
import RootLayout from "@/app/components/RootLayout/RootLayout";
import UseFetch from "@/hooks/UseFetch";
import POSTnewDevice, {translateKeys, translationMap} from "@/pages/addDevice/SaveDevice";
import Selector from "@/pages/addDevice/CreateSpecificationInput";
import AddNewSpecification from "@/pages/addDevice/AddNewSpecification";

/**
 * The main function of the addDevice page.
 * this function returns the code for the page
 * and calls function from other files to handle components.
 *
 * @returns {Element} the addDevice page
 */
export default function AddDevice() {

    // REACT STATE To store the already used specs
    const [alreadyUsedSpecs, setAlreadyUsedSpecs] = useState([]);

    // REACT STATE To store the device data
    const initialDeviceData = {
        Type: "",
        Merknaam: "",
        Model: "",
        Serienummer: "",
        Factuurnummer: "",
        LocatieNaam: "",
        LocatieStad: "",
        LocatieAdres: "",
        specificaties: []
    };


    const [values, setValues] = React.useState(new Set([]));
    const [DeviceData, setDeviceData] = useState(initialDeviceData);

    const resetState = () => {
        setDeviceData(initialDeviceData);
        setSelectedSpecs({});
        setValues(new Set([]));
    };

    const [selectedSpecs, setSelectedSpecs] = useState({});

    // Call a function that fetches the specs from the API and updates the alreadyUsedSpecs state.
    new getAlreadyUsedSpecs(alreadyUsedSpecs, setAlreadyUsedSpecs);

    function handleSubmit() {
        console.log('Submitting form...');
        const translatedData = translateKeys(DeviceData, translationMap);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(translatedData)
        };
        fetch('http://localhost:8080/devices', requestOptions)
            .then(response => {
                // Handle successful response
                console.log('Response:', response);
                resetState();
            })
            .catch(error => {
                // Handle error
                console.error('Error submitting form:', error);
                alert(error);
            });
    }

    return (
        <RootLayout>
            <h1 className="text-5xl md:mt-0 xs:mt-12 sm:mt-12">Nieuw Apparaat toevoegen</h1>
            <hr className="w-full h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-4 dark:bg-gray-700"/>
            <br/>
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
            <Selector
                alreadyUsedSpecs={alreadyUsedSpecs}
                DeviceData={DeviceData}
                setDeviceData={setDeviceData}
                selectedSpecs={selectedSpecs}
                setSelectedSpecs={setSelectedSpecs}
                values={values}
                setValues={setValues}
            />
            <button onClick={handleSubmit}
                    className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apparaat
                opslaan
            </button>
            <button onClick={resetState}
                    className="mt-3 ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Velden leegmaken
            </button>
            <br/><br/>
            <hr className="w-full h-1 mx-auto my-8 bg-gray-300 border-0 rounded md:my-4 dark:bg-gray-700"/>
            <h1 className="text-3xl mb-6 mt-6">Specificatie toevoegen die nog niet bestaat</h1>
            <AddNewSpecification
                alreadyUsedSpecs={alreadyUsedSpecs}
                setAlreadyUsedSpecs={setAlreadyUsedSpecs}
            />
        </RootLayout>
    );
}

/**
 * Function that fetches the specs from the API and updates the alreadyUsedSpecs state.
 * @param alreadyUsedSpecs already used specs
 * @param setAlreadyUsedSpecs set already used specs
 * @constructor
 */
function getAlreadyUsedSpecs(alreadyUsedSpecs, setAlreadyUsedSpecs) {
    const {data, loading, error} = UseFetch("http://localhost:8080/specs");

    Object.entries(data).map(([key, value]) => {
        if (!alreadyUsedSpecs.some(spec => spec.specName === key)) {
            setAlreadyUsedSpecs([...alreadyUsedSpecs, { specName: key, dataType: value }])
        }
    });
}

