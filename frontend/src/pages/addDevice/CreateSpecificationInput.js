/*
This file contains the selector component.
The export default function Selector is the main function that renders the selector component.
It uses the handleSpecificationsChange function to handle the change of the specifications
and updates the DeviceData state.
 */

import {Input, Select, SelectItem} from "@nextui-org/react";
import React, {useState} from "react";

/**
 * Main function that renders the selector component.
 * It's the part of the addDevice page where the user can
 * select specifications and add values to them.
 *
 * @param alreadyUsedSpecs the already used specs
 * @param DeviceData the device data state
 * @param setDeviceData the function to set the device data state
 * @returns {Element} the selector component
 */
export default function Selector({alreadyUsedSpecs, DeviceData, setDeviceData}) {

    // REACT STATE To store the selected specs
    const [selectedSpecs, setSelectedSpecs] = useState({});

    return (
        <div>
            <h1 className="text-3xl mb-6">Technische specificaties</h1>
            <Select
                label="Selecteer specificaties"
                selectionMode="multiple"
                onSelectionChange={(selectedItems) => {
                    const updatedSelectedSpecs = {};
                    selectedItems.forEach((item) => {
                        updatedSelectedSpecs[item] = alreadyUsedSpecs.find(spec => spec.specName === item).dataType;
                    });
                    setSelectedSpecs(updatedSelectedSpecs);
                }}
            >
                {Object.entries(alreadyUsedSpecs).map(([key, value]) => (
                    <SelectItem key={value.specName}>
                        {value.specName}
                    </SelectItem>
                ))}
            </Select>
            <p className="text-small ml-2 mt-2 text-default-500">Aantal geselecteerde
                specificaties: {Object.entries(selectedSpecs).length}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 md:break-after-auto">
                {Object.entries(selectedSpecs).map(([spec, dataType]) => (
                    <Input
                        key={spec}
                        size="md"
                        type="text"
                        variant="bordered"
                        label={spec}
                        className="mt-2 pr-3 pb-0.5 pt-0.5 relative z-0 w-full"
                        onChange={(e) => handleSpecificationsChange(spec, e.target.value, dataType, DeviceData, setDeviceData)}
                    />
                ))}
            </div>
        </div>
    );
}

/**
 * Function that handles the change of the specifications.
 * Because the specs are inside an object and in an array,
 * we need to handle the change of the specs differently.
 *
 * We're changing the specs in the DeviceData state realtime.
 * Therefore, we have to check if it already exists or not.
 * If it already exists, we update the value. If it doesn't exist,
 * we add a new object to the array with the provided specName, specValue and dataType.
 *
 * @param specName specification name
 * @param specValue specification value
 * @param dataType dataType of the specification
 * @param DeviceData the device data state
 * @param setDeviceData the function to set the device data state
 */
const handleSpecificationsChange = (specName, specValue, dataType, DeviceData, setDeviceData) => {
    const specIndex = DeviceData.specificaties.findIndex(spec => spec.specName === specName);
    if (specIndex !== -1) {
        const updatedSpecs = [...DeviceData.specificaties];
        updatedSpecs[specIndex].value = specValue;
        updatedSpecs[specIndex].dataType = dataType;
        setDeviceData(prevState => ({...prevState,
            specificaties: updatedSpecs,
        }));
    } else {
        setDeviceData(prevState => ({...prevState,
            specificaties: [...prevState.specificaties,
                { specName: specName, value: specValue, dataType: dataType }
            ]
        }));
    }
};