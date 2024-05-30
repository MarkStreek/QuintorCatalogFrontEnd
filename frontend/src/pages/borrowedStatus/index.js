import React from "react";
import RootLayout from "@/app/components/RootLayout/RootLayout";
import BorrowedStatusTableComponent from "@/app/components/Table/RenderBorrowedStatus";
import UseFetch from "@/hooks/UseFetch";

/**
 * Function that returns the borrowed status page of the application.
 * On this page, there is a Table with all the borrowed statuses.
 * The statuses are fetched from the API using the custom UseFetch hook.
 *
 * @returns {Element} The borrowed status page
 */
export default function BorrowedStatusPage() {
    /*
    Call the custom fetch hook from the UseFetch.js file.
    The parameter is the URL to fetch data from.
    The REACT useStates: data, loading, and error are returned from fetch hook and defined.
     */
    const { data, loading, error } = UseFetch("http://localhost:8080/borrowedstatus");

    // Transform the data if needed to handle the structure
    const transformedData = data?.map(item => ({
        id: item.id,
        user: item.user,
        device: item.device,
        status: item.status,
        borrowDate: item.borrowDate
    })) || [];

    // Return the RootLayout component,
    // with the right data passed to the BorrowedStatusTableComponent component.
    return (
        <RootLayout>
            <div>
                <h1 className="text-5xl">Lijst van alle uitgeleende apparaten</h1>
                <br />
                <BorrowedStatusTableComponent data={transformedData} loading={loading} error={error} />
            </div>
        </RootLayout>
    );
}
