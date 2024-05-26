import React from 'react';
import Link from "next/link";

/**
 * Function that returns the Navbar component.
 * This navbar component is used in the root layout component.
 * The navbar is visible on "smaller" screens.
 * When the screen is below a certain width, the navbar is visible.
 *
 * @returns {Element} The Navbar component.
 */
export default function Navbar() {
    return (
        <div className="bg-quintor-red text-gray-800 w-full xs:flex sm:flex md:hidden h-16 items-center justify-between px-2 fixed top-0 left-0 z-10">
            <Link href="/"><span className="text-2xl font-extrabold">Quintor Catalogus</span></Link>
            <nav>
                <ul className="flex space-x-3">
                    <li>
                        <Link href="/devices"
                              className="text-gray-800 hover:bg-gray-700 hover:text-white px-2 py-3 rounded-md">Apparaten</Link>
                    </li>
                    <li>
                        <Link href="/addDevice"
                              className="text-gray-800 hover:bg-gray-700 hover:text-white px-2 py-3 rounded-md">Apparaten toevoegen</Link>
                    </li>
                    <li>
                        <Link href="/borrowedStatus"
                              className="text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-3 rounded-md">Uitleenstatus</Link>
                    </li>
                    <li>
                        <Link href="/about"
                              className="text-gray-800 hover:bg-gray-700 hover:text-white px-2 py-3 rounded-md">Over</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
