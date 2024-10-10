import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component) => {
    const AuthRoute = () => {
        const token = localStorage.getItem('token');
        // אם אין Token, נבצע הפניה לעמוד התחברות
        if (!token) {
            return <Navigate to="/login" />;
        }
        // אם יש Token, נציג את הקומפוננטה
        return <Component />;
    };

    return AuthRoute;
};

export default withAuth;
