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
    return(
    <div
        className="bg-gray-800 text-white w-full xs:flex sm:flex md:hidden h-14 items-center justify-between px-2 fixed top-0 left-0">
        <span className="text-2xl font-extrabold">Quintor Catalog</span>
        <nav>
            <ul className="flex space-x-3">
                <li>
                    <Link href="/"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-3 rounded-md">Home</Link>
                </li>
                <li>
                    <Link href="/devices"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-3 rounded-md">Devices</Link>
                </li>
                <li>
                    <Link href="/about"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-3 rounded-md">About</Link>
                </li>
            </ul>
        </nav>
    </div>
    );
}