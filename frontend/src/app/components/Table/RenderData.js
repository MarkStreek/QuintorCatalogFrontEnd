import {TableCell, TableRow} from "@nextui-org/react";
import React from "react";

export default function renderData(dummyData) {
    return (dummyData.map((dummy, index) => (
        // eslint-disable-next-line react/jsx-key
        <TableRow>
            <TableCell className="align-top whitespace-pre-wrap">{dummy.type}</TableCell>
            <TableCell className="align-top whitespace-pre-wrap">{dummy.brandName}</TableCell>
            <TableCell className="align-top whitespace-pre-wrap">{dummy.model}</TableCell>
            <TableCell className="align-top whitespace-pre-wrap">{dummy.serialNumber}</TableCell>
            <TableCell className="align-top whitespace-pre-wrap">{dummy.invoiceNumber}</TableCell>
            <TableCell className="align-top whitespace-pre-wrap">{dummy.locationName}</TableCell>
            <TableCell className="align-top whitespace-pre-wrap">{dummy.locationCity}</TableCell>
            {/* Gebruik aangepaste stijlen voor de laatste cel */}
            <TableCell>
                {dummy.specs && dummy.specs.length > 0 ? (
                    dummy.specs.map((spec, index) => (
                        // Gebruik een <div> in plaats van <p> voor betere uitlijning
                        <div key={index}>{spec.specName} : {spec.value}</div>
                    ))
                ) : (<div>Niet beschikbaar</div>)}
                <hr className="w-full h-0.5 mx-auto m-2 bg-gray-300 border-0 rounded dark:bg-gray-700"/>
            </TableCell>
        </TableRow>
    )));
}