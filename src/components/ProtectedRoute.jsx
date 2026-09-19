import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config.js";

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();

    const getUser = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const userId = user.uid;

                setUser(user)

                // ...
            } else {

                setUser(null)
                // User is signed out
                // ...
            }

            setLoading(false)
        });
    };


    useEffect(() => {
        getUser();

        return () => getUser();
    }, []);

    if (loading) {
        return <p>user araha haii...</p>;
    }

    if (user) {

        return children
        // return <Navigate to="/" />
    } else {
        return <Navigate to={"/login"} />
    }

};

export default ProtectedRoute;
