import React from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";

function ProtectedRoute({element: Component, ...props}) {
    if(props.isChecking) {
           return <Header />
        }
    return props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
} 

export default ProtectedRoute;