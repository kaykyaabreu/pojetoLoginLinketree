import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

import { auth } from '../../services/firebaseConection';
import {signOut} from 'firebase/auth';



export function Header() {

    async function handleLogOut() {
        await signOut(auth)
        
    }

    return (
        <div>
            <header className="w-full max-w-2xl mt-4 px-1 flex justify-center mx-auto">
                <nav className="w-full bg-white h-12 flex items-center justify-between px-3 rounded-md">
                    <div className="flex gap-4 font-medium">
                        <Link to="/">
                        home
                        </Link>
                        <Link to="/admin">
                        Meus Links
                        </Link>
                        <Link to="/admin/social">
                        Redes Sociais
                        </Link>
                    </div>
                    <button onClick={handleLogOut}>
                        <BiLogOut size={28} color="#bd2629"></BiLogOut>
                    </button>
                </nav>
            </header>
        </div>
    )
}