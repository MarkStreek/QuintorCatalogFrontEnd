import React from "react";
import RootLayout from "@/app/components/RootLayout/RootLayout";
import DummyDataTable from "@/app/components/Table/RenderTable";
import UseFetch from "@/hooks/UseFetch";

/**
 * Function that returns the devices page of the application.
 * On this page, there is a Table with all the hardware devices.
 * The devices are fetched from the API using the custom UseFetch hook.
 *
 * @returns {Element} The devices page
 */
export default function devices() {
    /*
    Call the custom fetch hook from the UseFetch.js file.
    The parameter is the URL to fetch data from.
    The REACT useStates: data, loading, and error are returned from fetch hook and defined.
     */
    const {data, loading, error} = UseFetch("http://localhost:8080/devices");

    // Return the RootLayout component,
    // with the right data passed to the DummyDataTable component.
    return (
        <RootLayout>
            <div>
                <h1 className="text-5xl">Lijst van alle apparaten</h1>
                <br/>
                <DummyDataTable data={data} loading={loading} error={error}/>
            </div>
        </RootLayout>
    )
}