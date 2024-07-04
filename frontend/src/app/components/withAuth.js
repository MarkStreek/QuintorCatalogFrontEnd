import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Higher-order component that provides authentication functionality to a wrapped component.
 *
 * @param {React.Component} WrappedComponent - The component to be wrapped with authentication functionality.
 * @returns {React.Component} - The wrapped component with authentication functionality.
 */
const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
