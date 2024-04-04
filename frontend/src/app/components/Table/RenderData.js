import {Button, Dropdown, DropdownItem,
        DropdownMenu, DropdownTrigger,
        TableCell, TableRow} from "@nextui-org/react";
import React from "react";

export default function renderData(dummyData) {
    return (dummyData.map((dummy, index) => (
        <TableRow key={index}>
            <TableCell>{dummy.name}</TableCell>
            <TableCell>{dummy.brandName}</TableCell>
            <TableCell>{dummy.model}</TableCell>
            <TableCell>{dummy.serialNumber}</TableCell>
            <TableCell>{dummy.invoiceNumber}</TableCell>
            <TableCell>{dummy.locationName}</TableCell>
            <TableCell>{dummy.locationCity}</TableCell>
            <TableCell>
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="bordered" size="sm">
                            Specificaties weergeven
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        {dummy.specs && dummy.specs.length > 0 ? (
                            dummy.specs.map((spec, index) => (
                                <DropdownItem
                                    textValue={`${spec.specName}: ${spec.value}`}
                                    key={index}>{spec.specName}: {spec.value}
                                </DropdownItem>
                            ))
                        ) : (<DropdownItem textValue={"Niet beschikbaar"}>Niet beschikbaar</DropdownItem>)}
                    </DropdownMenu>
                </Dropdown>
            </TableCell>
        </TableRow>
    )));
}