import React from "react";
import RootLayout from "@/app/components/RootLayout/RootLayout";
import DevicesTableComponent from "@/app/components/Table/RenderTable";
import UseFetch from "@/hooks/UseFetch";
import withAuth from "@/app/components/withAuth";

/**
 * Function that returns the devices page of the application.
 * On this page, there is a Table with all the hardware devices.
 * The devices are fetched from the API using the custom UseFetch hook.
 *
 * @returns {Element} The devices page
 */
const DevicesPage = () => {
    /*
    Call the custom fetch hook from the UseFetch.js file.
    The parameter is the URL to fetch data from.
    The REACT useStates: data, loading, and error are returned from fetch hook and defined.
     */
    const { data, loading, error } = UseFetch("http://localhost:8080/devices");

    // Return the RootLayout component,
    // with the right data passed to the DevicesTableComponent component.
    return (
        <RootLayout>
            <div>
                <h1 className="text-5xl">Lijst van alle apparaten</h1>
                <br />
                <DevicesTableComponent data={data} loading={loading} error={error} />
            </div>
        </RootLayout>
    );
};

export default withAuth(DevicesPage);
