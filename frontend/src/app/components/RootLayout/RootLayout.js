import React from 'react';
import Navbar from "@/app/components/RootLayout/Navbar";
import Sidebar from "@/app/components/RootLayout/Sidebar";



/**
 * Function that returns the RootLayout component.
 * On every page, this root layout component is imported
 * and used to pass the children components to render the page.
 * Therefore, on every page, the Navbar and Sidebar components are rendered.
 *
 * @param children All the children components to render in the RootLayout component.
 * @returns {Element} The RootLayout component with the children components.
 * @constructor
 */
const RootLayout = ({ children }) => {
    return (
        <div className="overpass-fontType">
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                {/* Sidebar for bigger screens */}
                <div className="flex-none w-48 sm:hidden xs:hidden md:block">
                    <Sidebar/>
                </div>
                {/* Navbar for smaller screens */}
                <div className="w-full xs:flex sm:flex md:hidden bg-gray-800 h-16 text-white items-center justify-normal">
                    <Navbar/>
                </div>
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12 ">{children}</div>
            </div>
        </div>
    );
};

export default RootLayout;