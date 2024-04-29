import React from "react";
import {Input, Select, SelectItem} from "@nextui-org/react";

/**
 * Main global export function that creates the selector component for the AddDevice page.
 * The selector component is used to select specifications and add values to them.
 * This function is split into multiple functions to create the selector and the input fields.
 * See the return statement for the full component.
 *
 * @param alreadyUsedSpecs the already used specs in the database
 * @param DeviceData the state of the device data (component that holds the full state)
 * @param setDeviceData the function to set the state of the device data
 * @param values the selected values
 * @param setValues the function to set the selected values
 * @returns {Element} the selector component
 */
export default function Selector({ alreadyUsedSpecs, DeviceData, setDeviceData, values, setValues}) {

    /**
     * Small function that handles the selection change of the selector.
     * When a user selects a value, the state of the selected values will be updated.
     *
     * @param event the event of the selector
     */
    const handleSelectionChange = (event) => {
        setValues(new Set(event.target.value.split(",")));
    };

    return (
        <div>
            {/*
            Create the selector and specify the handleSelectionChange as parameter
            */}
            {createSelectorWithOptions(values, handleSelectionChange, alreadyUsedSpecs)}
            <p className="text-small text-default-500">Selected: {Array.from(values).join(", ")}</p>
            {/*
            Create the Input options and specify the DeviceData as parameter to directly store the
            values in the state of the device data.
            */}
            {createInputOptionsBasedOnSelectedItems(values, alreadyUsedSpecs, DeviceData, setDeviceData)}
        </div>
    );
}

/**
 * Function that creates a selector with options
 * The returned block with code is a Select component with SelectItems,
 * that is placed in the main Selector function.
 *
 * @param values the selected values
 * @param handleSelectionChange the function that handles the selection change
 * @param alreadyUsedSpecs the already used specs in the database
 * @returns {Element} the selector with options
 */
function createSelectorWithOptions(values, handleSelectionChange, alreadyUsedSpecs) {
    return <Select
        label="Specificaties"
        selectionMode="multiple"
        placeholder="Selecteer een specificatie"
        selectedKeys={values}
        className="max-w-xs"
        onChange={handleSelectionChange}
    >
        {Object.entries(alreadyUsedSpecs).map(([key, value]) => (
            <SelectItem key={value.specName}>
                {value.specName}
            </SelectItem>
        ))}
    </Select>;
}

/**
 * Function that creates input options based on selected items.
 * Based on the selected values, the function will create an input field for each selected value.
 * When updating these fields, the handleInputChange function will be called.
 * HandleInputChange will update the state of the specificaties in the DeviceData.
 *
 * @param values the selected values
 * @param alreadyUsedSpecs the already used specs in the database
 * @param DeviceData the state of the device data (component that holds the full state)
 * @param setDeviceData the function to set the state of the device data
 * @returns {Element} the input fields based on the selected items
 */
function createInputOptionsBasedOnSelectedItems(values, alreadyUsedSpecs, DeviceData, setDeviceData) {
    return <div className="grid grid-cols-1 md:grid-cols-2 md:break-after-auto gap-2">
        {Array.from(values).map((key) => {
            const spec = alreadyUsedSpecs.find(spec => spec.specName === key);
            if (spec) {
                return (
                    <Input
                        key={key}
                        size="md"
                        type="text"
                        variant="bordered"
                        label={key}
                        value={DeviceData[key]}
                        onChange={(e) => handleInputChangeOfInput(DeviceData, setDeviceData, key, e.target.value, spec.dataType)}
                    />
                );
            }
            return null;
        })}
    </div>;
}

/**
 * Function that handles the input change of a specific input field.
 * When a client types in the input field, the state of the specificaties in the DeviceData will be updated.
 * Because the state has a complex nesting structure, the function needs to do some checks to update the correct value.
 *
 * @param DeviceData the state of the device data
 * @param setDeviceData the function to set the state of the device data
 * @param specName the name of the specification
 * @param specValue the value of the specification
 * @param dataType the data type of the specification
 */
function handleInputChangeOfInput(DeviceData, setDeviceData, specName, specValue, dataType) {
    const specIndex = DeviceData.specificaties.findIndex(spec => spec.specName === specName);
    if (specIndex !== -1) {
        const updatedSpecs = [...DeviceData.specificaties];
        updatedSpecs[specIndex].value = specValue;
        updatedSpecs[specIndex].dataType = dataType;
        setDeviceData(prevState => ({...prevState, specificaties: updatedSpecs}));
    } else {
        setDeviceData(prevState => ({
            ...prevState,
            specificaties: [
                ...prevState.specificaties,
                {specName: specName, value: specValue, dataType: dataType}
            ]
        }));
    }
}