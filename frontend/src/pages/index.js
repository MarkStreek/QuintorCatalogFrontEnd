import React, {useState} from "react";
import RootLayout from "../app/components/RootLayout";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

/**
 * Function that returns the home page of the application.
 * @returns {Element} The home page.
 */
export default function Home() {

    const [search, setSearch] = useState("");
    function handleSubmit() {
        console.log(search);
    }

    return (
        <RootLayout>
            <h1 className="text-5xl">Quintor hardware catalog</h1>
            <br/>
            <p className="text-2xl">Welcome, User</p>
            <br/>
            <p className="text-2xl">Quick links:</p>
            <div className="mt-2">
                <Button color="primary" size="large">
                    <Link href="/devices">Devices</Link>
                </Button>
            </div>
            <br/>
            <form onSubmit={handleSubmit}>
            <p className="m-2">Search for a device below</p>
            <div className="flex w-1/3">
                <Input
                    size="md"
                    type="text"
                    variant="bordered"
                    label="Search for devices"
                    placeholder="e.g. laptop or keyboard"
                    className="h-12"
                    onChange={(event) => setSearch(event.target.value)}
                />
                <Button type="submit" color="primary" size="large" className="ml-2 h-12 w-28">Search</Button>
            </div>
            </form>

        </RootLayout>
    );
}