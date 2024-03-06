import React from 'react';

const RootLayout = ({ children }) => {
    return (
        <div>
            {/* Add your header component here */}
            <header>
                <h1>Header</h1>
                {/* Add your header content */}
            </header>

            {/* Add your main content */}
            <main>
                {children}
            </main>

            {/* Add your footer component here */}
            <footer>
                {/* Add your footer content */}
            </footer>
        </div>
    );
};

export default RootLayout;