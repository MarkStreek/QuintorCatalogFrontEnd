import React from 'react';
import Link from "next/link";

/**
 * Function that return the Sidebar component.
 * This sidebar component is used in the root layout component.
 * It contains the navigation links to the home and about page.
 * The sidebar is only visible on "bigger" screens.
 *
 * @returns {Element} The Sidebar component.
 */
export default function Sidebar() {
    return (
        <div className="h-screen bg-gray-800 text-white w-48 space-y-6 py-7 px-2 fixed inset-y-0 left-0 overflow-auto">
            <div className="flex items-center space-x-4">
                <Link href="/"><span className="text-2xl font-extrabold">Quintor Catalogus</span></Link>
            </div>
            <nav>
                <ul className="space-y-3">
                    <li>
                        <Link href="/"
                              className="text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-3 rounded-md">Home</Link>
                    </li>
                    <li>
                        <Link href="/devices"
                              className="text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-3 rounded-md">Apparaten</Link>
                    </li>
                    <li>
                        <Link href="/addDevice"
                              className="text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-3 rounded-md">Apparaten toevoegen</Link>
                    </li>
                    <li>
                        <Link href="/about"
                              className="text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-3 rounded-md">Over</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}