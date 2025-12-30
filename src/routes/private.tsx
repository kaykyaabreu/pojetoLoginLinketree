import { auth } from "../services/firebaseConection";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

    interface PrivateProps {
    children: React.ReactNode;
    }

import type { ReactElement } from "react";
import React from "react";
export function Private({ children }: PrivateProps): ReactElement | null {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setSigned(true);
            } else {
                setSigned(false);
            }
            if(user){
                const userData = {
                    uid: user?.uid,
                    email: user?.email,
                }
                localStorage.setItem("@reactlinks", JSON.stringify(userData));
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!signed) return <Navigate to="/login" />;
    if (React.isValidElement(children)) return children;
    return null;
}