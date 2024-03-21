import {Skeleton, TableCell, TableRow} from "@nextui-org/react";
import React from "react";

/**
 * Function that returns the table body or skeleton data based on the loading state.
 * If the loading is true, the function returns a skeleton data.
 * If the loading is false, the function returns the actual data.
 *
 * @param loading the loading state (boolean)
 * @param rowsPerPage the amount of rows per page
 * @param dummyData the dummy data (sliced out of the actual data)
 * @returns {Element} The skeleton data or actual data
 */
export default function renderDataOrSkeleton(loading, rowsPerPage, dummyData) {
    if (loading) {
        return Array.from({ length: rowsPerPage }).map((_, index) => (
            <TableRow key={index}>
                <TableCell>
                    <Skeleton className='w-2/5 rounded-lg' data-testid="skeleton">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                </TableCell>
                <TableCell>
                    <Skeleton className='w-4/5 rounded-lg'>
                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </TableCell>
                <TableCell>
                    <Skeleton className='w-4/5 rounded-lg'>
                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </TableCell>
            </TableRow>
        ))
    } else {
        return dummyData.map((dummy, index) => (
            <TableRow key={index}>
                <TableCell>{dummy.id}</TableCell>
                <TableCell>{dummy.name}</TableCell>
                <TableCell>{dummy.value}</TableCell>
            </TableRow>
        ))
    }
}