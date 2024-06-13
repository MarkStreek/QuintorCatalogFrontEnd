import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Button } from "@nextui-org/react";
import { GiHamburgerMenu } from "react-icons/gi";

/**
 * Function that returns the Navbar component.
 * This navbar component is used in the root layout component.
 * The navbar is visible on "smaller" screens.
 * When the screen is below a certain width, the navbar is visible.
 *
 * @returns {Element} The Navbar component.
 */
export default function Navbar() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Ensure localStorage is accessed only on the client side
        if (typeof window !== 'undefined') {
            const storedEmail = localStorage.getItem('email');
            setEmail(storedEmail);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        window.location.href = '/login'; // Redirect to the login page
    };

    return (
        <div className="bg-quintor-red text-gray-300 w-full xs:flex sm:flex md:hidden h-16 items-center justify-between px-2 fixed top-0 left-0 z-10">
            <Link href="/"><span className="text-2xl font-extrabold">Quintor Catalogus</span></Link>
            <nav>
                <ul className="flex items-center">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="faded">
                                <GiHamburgerMenu/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="home">
                                <Link href="/" className="text-gray-800 px-2 py-3 rounded-md w-full">
                                    Home
                                </Link>
                            </DropdownItem>
                            <DropdownItem key="devices">
                                <Link href="/devices" className="text-gray-800 px-2 py-3 rounded-md w-full">
                                    Apparaten
                                </Link>
                            </DropdownItem>
                            <DropdownItem key="addDevice">
                                <Link href="/addDevice" className="text-gray-800 px-2 py-3 rounded-md w-full">
                                    Apparaten toevoegen
                                </Link>
                            </DropdownItem>
                            <DropdownItem key="borrowedRequest">
                                <Link href="/borrowedRequest" className="text-gray-800 px-2 py-3 rounded-md w-full">
                                    Uitleen verzoek
                                </Link>
                            </DropdownItem>
                            <DropdownItem key="borrowedStatus">
                                <Link href="/borrowedStatus" className="text-gray-800 px-2 py-3 rounded-md w-full">
                                    Uitleenstatus
                                </Link>
                            </DropdownItem>
                            <DropdownItem key="about">
                                <Link href="/about" className="text-gray-800 px-2 py-3 rounded-md w-full">
                                    Over
                                </Link>
                            </DropdownItem>
                            <DropdownItem key="logout">
                                <Link href={""} className="text-gray-800 px-2 py-3 rounded-md w-full" onClick={logout}>
                                    Logout
                                </Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </ul>
            </nav>
        </div>
    );
}
