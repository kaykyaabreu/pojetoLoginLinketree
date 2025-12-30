import { auth } from "../services/firebaseConection";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, ReactNode } from "react";
import { Navigate } from "react-router-dom";

    interface PrivateProps {
    children: React.ReactNode;
    }

export function Private({ children }: PrivateProps):any {
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

    return signed ? children : <Navigate to="/login" />;
}