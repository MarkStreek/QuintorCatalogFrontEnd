/*
This file contains the main functionality of the AddNewSpecification component.
The function AddNewSpecification is the main function that renders the AddNewSpecification component.
 */

import {Input} from "@nextui-org/react";
import React, {useState} from "react";


/**
 * This function returns the component that allows the user to add a new specification.
 * The function is called from the index.js file of the addDevice page.
 * The user can define a new specification by specifying the name and the data type.
 *
 * Pushing the button will not directly add the specification to the database,
 * but add to the Device Data state. And when adding a new Device,
 * the backend logic will check if the specification already exists.
 *
 * @param alreadyUsedSpecs
 * @param setAlreadyUsedSpecs
 * @returns {Element}
 * @constructor
 */
export default function AddNewSpecification({alreadyUsedSpecs, setAlreadyUsedSpecs}) {

    // REACT STATE To store the new spec that needs to be added to the alreadyUsedSpecs
    const [addNewSpec, setAddNewSpec] = useState({name: "", dataType: ""});

    return (
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
                    if (!alreadyUsedSpecs.some(spec => spec.specName === addNewSpec.name)) {
                        setAlreadyUsedSpecs([...alreadyUsedSpecs, {
                            specName: addNewSpec.name,
                            dataType: addNewSpec.dataType
                        }]);
                    }
                }}
            >
            </Input>
        </div>
    );
}