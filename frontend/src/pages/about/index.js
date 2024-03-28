import React from "react";
import RootLayout from "@/app/components/RootLayout/RootLayout";
export default function Index() {
    return(
        <RootLayout>
            <p className="text-4xl">About page</p>
            <br />
            <p>This application...</p>
            <br />
            <p className="text-2xl">Info about adding Devices</p>
        </RootLayout>
    );
}
