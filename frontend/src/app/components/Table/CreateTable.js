import React from "react";
import { Pagination } from "@nextui-org/react";
import { Table } from "@nextui-org/react";

/**
 * Function that returns the Table component from the nextui library.
 * The function takes in props as an argument and
 * returns the Table component with the props passed in.
 * @param props the props to pass to the Table component
 * @returns {Element} the Table component
 */
const TableComponent = (props) => {
    return (
        <Table
            aria-label="Dummy Data Table"
            bottomContent = {
                <div className="">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={props.currentPage}
                        total={props.amountOfPages}
                        onChange={(page) => props.setPage(page)}
                    />
            </div>}
            classNames={{wrapper: "min-h-[222px]"}}
        >
            {props.children}
        </Table>
    );
}

export default TableComponent;