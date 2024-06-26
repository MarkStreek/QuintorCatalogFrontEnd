/*
This file contains the main functionality of the AddNewSpecification component.
The function AddNewSpecification is the main function that renders the AddNewSpecification component.
 */

import {Input, Select, SelectItem} from "@nextui-org/react";
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
 * @param setMessage
 * @param resetState
 * @param setIsError
 * @returns {Element}
 * @constructor
 */
export default function AddNewSpecification({alreadyUsedSpecs, setAlreadyUsedSpecs, setMessage, resetState, setIsError}) {

    // REACT STATES To store the new spec that needs to be added to the alreadyUsedSpecs
    const [value, setValue] = useState(new Set([]));
    const [name, setName] = useState("");

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:break-after-auto">
            <Input
                size="md"
                value={name}
                type="text"
                variant="bordered"
                label="Specificatie naam"
                placeholder={"b.v. Schermgrootte, RAM"}
                onChange={(e) => {setName(e.target.value);}}
                className="p-3 relative z-0"
            />
            <Select
                size="md"
                value={value}
                selectedKeys={value}
                variant="bordered"
                label="Specificatie type"
                placeholder={"b.v. String, int, boolean"}
                onSelectionChange={setValue}
                className="p-3 relative z-0"
            >
                <SelectItem key="tekst" value="tekst">Tekst</SelectItem>
                <SelectItem key="boolean" value="boolean">Boolean</SelectItem>
                <SelectItem key="getal" value="getal">Getal</SelectItem>
                <SelectItem key="datum" value="datum">Datum</SelectItem>
                <SelectItem key="tijd" value="tijd">Tijd</SelectItem>
            </Select>
            <Input
                className="w-44 ml-3"
                type={"submit"}
                value={"Specificatie toevoegen"}
                onClick={() => {
                    if (!alreadyUsedSpecs.some(spec => spec.specName === name)) {
                        setAlreadyUsedSpecs([...alreadyUsedSpecs, {
                            specName: name,
                            dataType: Array.from(value).join(", ")
                        }]);
                        // Reset the addNewSpec state
                        setMessage("Niewe specificatie succesvol toegevoegd, nu vindbaar in de lijst met specificaties.");
                        setTimeout(() => {
                            setMessage(null);
                        }, 4000);
                        setName("");
                        setValue(new Set([]));
                    }
                    else {
                        setIsError(true);
                        setMessage("De specificatie bestaat al, voer een andere specificatie in.");
                        setTimeout(() => {
                            setMessage(null);
                        }, 4000);
                    }
                }}
            >
            </Input>
        </div>
    );
}