import React, {useState, useEffect} from "react";
import RootLayout from "../app/components/RootLayout";
import DummyDataTable from "../app/components/RenderTable";

export default function Home() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /*
    useEffect hook that runs when the component mounts. It fetches the data from the API.
    The hook updates the states based on the fetch status. These states are passed to the DummyDataTable component.
    In the dummy data table component, the states are used to create, render, and update the table.
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await fetch("http://localhost:8080/components");
                let data = await response.json();
                setData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }

        }
        void fetchData();
    }, []);

    return (
        <RootLayout>
            <h1>Hello World!</h1>
            <h3>Here is a table of dummy data</h3>
            <br></br>
            <div className="w-5/6 mx-auto">
                <DummyDataTable data={data} loading={loading} error={error}/>
            </div>
        </RootLayout>
    );
}