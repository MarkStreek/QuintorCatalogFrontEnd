import {Input} from "@nextui-org/react";
import React, {useState} from "react";

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