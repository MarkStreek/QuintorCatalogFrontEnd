/*
* This file render the AddDevice page.
* The AddDevice page is the page where the user can add a new device to the database.
* The page is split into more components:
*   - CreateSpecificationInput.js: The component where the user can select specifications and add values to them.
*   - AddNewSpecification.js: The component where the user can add a new specification that does not exist yet.
*   - SaveDevice.js: The function that sends the device data to the API.
*/

import React, { useState } from "react";
import {Input, Select, SelectItem} from '@nextui-org/react';
import RootLayout from "@/app/components/RootLayout/RootLayout";
import UseFetch from "@/hooks/UseFetch";
import { translateKeys, translationMap } from "@/pages/addDevice/SaveDevice";
import Selector from "@/pages/addDevice/CreateSpecificationInput";
import AddNewSpecification from "@/pages/addDevice/AddNewSpecification";
import withAuth from "@/app/components/withAuth";
import {CheckCircleIcon, ExclamationIcon, XIcon} from "@heroicons/react/solid";

/**
 * The main function of the addDevice page.
 * this function returns the code for the page
 * and calls function from other files to handle components.
 *
 * @returns {Element} the addDevice page
 */
const AddDevice = () => {
    // REACT STATE To store the already used specs
    const [alreadyUsedSpecs, setAlreadyUsedSpecs] = useState([]);
    const [isError, setIsError] = useState(false);

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

    const [message, setMessage] = useState(null);

    function Notification({ message }) {
        const messageClass = isError ? "bg-red-500" : "bg-green-500";
        return (
            <div className={`fixed top-20 right-20 text-white px-4 py-2 rounded-lg shadow-lg w-1/4 ${messageClass} border border-white border-opacity-20 backdrop-filter backdrop-blur-lg`}>
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        {isError ? <ExclamationIcon className="h-5 w-5 text-white" /> : <CheckCircleIcon className="h-5 w-5 text-white" />}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm leading-5 font-medium text-white">
                            {message}
                        </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button className="inline-flex text-white focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                            <XIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const [values, setValues] = useState(new Set([]));
    const [DeviceData, setDeviceData] = useState(initialDeviceData);

    /**
     * Resets the state of the component.
     */
    const resetState = () => {
        setDeviceData(initialDeviceData);
        setSelectedSpecs({});
        setValues(new Set([]));
    };

    const [selectedSpecs, setSelectedSpecs] = useState({});

    // Call a function that fetches the specs from the API and updates the alreadyUsedSpecs state.
    new getAlreadyUsedSpecs(alreadyUsedSpecs, setAlreadyUsedSpecs);

    /**
     * Handles the form submission.
     * @async
     * @function handleSubmit
     * @returns {Promise<void>} A Promise that resolves when the form submission is complete.
     */
    const handleSubmit = async () => {
        console.log('Submitting form...');
        const token = localStorage.getItem('token');
        const translatedData = translateKeys(DeviceData, translationMap);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the headers
            },
            body: JSON.stringify(translatedData)
        };
        try {
            const response = await fetch('http://localhost:8080/devices', requestOptions);
            const data = await response.json();
            if (response.ok) {
                setIsError(false);
            } else {
                setIsError(true);
            }
            setMessage(data.message);
            if (response.ok) {
                resetState();
            }
            setTimeout(() => {
                setMessage(null);
            }, 4000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('Er is een fout opgetreden bij het toevoegen van het apparaat.');
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    };

    return (
        <RootLayout>
            <h1 className="text-5xl md:mt-0 xs:mt-12 sm:mt-12">Nieuw Apparaat toevoegen</h1>
            <hr className="w-full h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-4 dark:bg-gray-700"/>
            <br/>
            <h1 className="text-3xl mb-6">Eigenschappen</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 md:break-after-auto">
                {Object.keys(DeviceData).map((key) => {
                    if (key === "specificaties") return null;
                    if (key === "Type") return (
                        <Select
                            key={key}
                            size="md"
                            value={DeviceData[key]}
                            selectedKeys={[DeviceData[key]]}
                            placeholder={"Selecteer een type"}
                            variant="bordered"
                            label="Type"
                            onSelectionChange={(newValue) => setDeviceData({...DeviceData, [key]: newValue.anchorKey})}
                            className="mt-2 pr-3 pb-0.5 pt-0.5 relative z-0 w-full"
                        >
                            <SelectItem key="laptop" value="laptop">Laptop</SelectItem>
                            <SelectItem key="desktop" value="desktop">Desktop</SelectItem>
                            <SelectItem key="telefoon" value="telefoon">Telefoon</SelectItem>
                            <SelectItem key="monitor" value="monitor">Monitor</SelectItem>
                            <SelectItem key="tablet" value="tablet">Tablet</SelectItem>
                            <SelectItem key="server" value="server">Server</SelectItem>
                            <SelectItem key="switch" value="switch">Switch</SelectItem>
                            <SelectItem key="router" value="router">Router</SelectItem>
                            <SelectItem key="printer" value="printer">Printer</SelectItem>
                            <SelectItem key="accesspoint" value="accesspoint">Accesspoint</SelectItem>
                            <SelectItem key="firewall" value="firewall">Firewall</SelectItem>
                        </Select>
                    );
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
                    className="mt-3 text-white bg-quintor-red hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apparaat
                opslaan
            </button>
            {message && <Notification message={message} onClose={() => setMessage(null)} />}
            <button onClick={resetState}
                    className="mt-3 ml-3 text-white bg-quintor-red hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Velden leegmaken
            </button>
            <br/><br/>
            <hr className="w-full h-1 mx-auto my-8 bg-gray-300 border-0 rounded md:my-4 dark:bg-gray-700"/>
            <h1 className="text-3xl mb-6 mt-6">Specificatie toevoegen die nog niet bestaat</h1>
            <AddNewSpecification
                alreadyUsedSpecs={alreadyUsedSpecs}
                setAlreadyUsedSpecs={setAlreadyUsedSpecs}
                setMessage={setMessage}
                resetState={resetState}
                setIsError={setIsError}
            />
        </RootLayout>
    );
};

export default withAuth(AddDevice);

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

