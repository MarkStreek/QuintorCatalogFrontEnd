import React, { useState } from "react";
import RootLayout from "../app/components/RootLayout/RootLayout";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import withAuth from "@/app/components/withAuth";

/**
 * Function that returns the home page of the application.
 * @returns {Element} The home page.
 */
const Home = () => {
    const [search, setSearch] = useState("");
    const router = useRouter();

    function handleSubmit(event) {
        event.preventDefault();
        router.push(`/devices?search=${search}`).then();
    }

    return (
        <RootLayout>
            <h1 className="text-5xl">Quintor hardware catalogus</h1>
            <br />
            <p className="text-2xl">Welkom</p>
            <br />
            <p className="text-2xl">Snelle links:</p>
            <div className="mt-2 flex gap-2">
                <Button className="bg-quintor-red text-white" size="large">
                    <Link href="/devices">Apparaten</Link>
                </Button>
                <Button className="bg-quintor-red text-white" size="large">
                    <Link href="/addDevice">Apparaat toevoegen</Link>
                </Button>
            </div>
            <br />
            <form onSubmit={handleSubmit}>
                <p className="m-2">Zoek naar een apparaat</p>
                <div className="flex">
                    <Input
                        size="md"
                        type="text"
                        variant="bordered"
                        label="Zoek voor apparaten"
                        placeholder="b.v. laptop of toetsenbord"
                        className="h-12"
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <Button type="submit" color="primary" size="large" className="bg-quintor-red text-white ml-2 h-12 w-28">Zoek</Button>
                </div>
            </form>
        </RootLayout>
    );
};

export default withAuth(Home);
