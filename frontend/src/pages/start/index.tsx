import { useState } from "react";
import React from "react";

export default function StartPage() {
    // Use state to keep track of the count
    const [count, setCount] = useState(0);
    
    // Function that handles the click event
    const handleClick = () => {
        setCount(count + 1);
    }
    // Return the JSX that will be rendered
    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <h1 className="text-4xl">Start Page</h1>
                <p className="text-2xl">Count: {count}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>Increment</button>
            </div>
        </div>
    );
}