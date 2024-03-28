import React, {useState} from "react";
import {Button, Input, Select, SelectItem} from '@nextui-org/react';
import RootLayout from "@/app/components/RootLayout/RootLayout";
import UseFetch from "@/hooks/UseFetch";

export default function AddDevice() {

        let alreadyUsedSpecs = GetAlreadyUsedSpecs();
        const [value, setValue] = useState(new Set([]));

        const [DeviceData, setComponentData] = useState(
            {
                name: "",
                brandName: "",
                model: "",
                serialNumber: "",
                invoiceNumber: "",
                locationCity: "",
                locationAddress: "",
                locationName: "",
                specs: [],
                    });

    return (
        <RootLayout>
            <h1 className="text-5xl md:mt-0 xs:mt-12 sm:mt-12">Add new device</h1>
            <br/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:break-after-auto">
                <div>
                    <h1 className="text-3xl mb-4">Properties</h1>
                    {Object.keys(DeviceData).map((key) => (
                        <Input
                            key={key}
                            size="md"
                            type="text"
                            variant="bordered"
                            label={key}
                            value={DeviceData[key]}
                            onChange={(e) => setComponentData({...DeviceData, [key]: e.target.value})}
                            className="p-3 relative z-0"
                            isClearable={true}
                        />
                    ))}
                </div>
                <div>
                    <h1 className="text-3xl mb-6">Specifications</h1>
                    <Select
                        label="Select a specification"
                        selectionMode="multiple"
                        onSelectionChange={setValue}
                    >
                        {alreadyUsedSpecs.map((spec) => (
                            <SelectItem key={spec}>
                                {spec}
                            </SelectItem>
                        ))}
                    </Select>
                    <p className="text-small text-default-500">Selected: {value.size}</p>
                    <div className="ml-full">
                        {Array.from(value).map((spec) => (
                            <Input
                                key={spec}
                                size="md"
                                type="text"
                                variant="bordered"
                                label={spec}
                                className="p-3 relative z-0 w-full"
                                isClearable={true}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </RootLayout>
    );
}

function GetAlreadyUsedSpecs() {

    let alreadyUsedSpecs = [];
    const {data, loading, error} = UseFetch("http://localhost:8080/specs");
    data.map((spec) => {
        if (!alreadyUsedSpecs.includes(spec.name)) {
            alreadyUsedSpecs.push(spec.name);
        }
    });

    return alreadyUsedSpecs;
}