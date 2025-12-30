import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/input';

import { auth } from "../../services/firebaseConection";
import { signInWithEmailAndPassword } from "firebase/auth";
import {} from "firebase/firestore";

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    function HandleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (email === "" || password === "") {
            alert("Preencha todos os campos!")
            return;}

            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/admin", { replace: true });
                alert("Login realizado com sucesso!")
            })
            .catch((error)=> {
                console.log("Erro ao fazer login: ", error)
                alert("Erro ao fazer login, verifique os seus dados!");
                
                console.log(error)
            })
        
    }

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center h-screen">
            <Link to="/">
            <h1 className='mb-11 text-white font-bold text-5xl '>Devs 
                <span className='bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent'>Link</span></h1>
            </Link>

        <form action="" 
        onSubmit={HandleSubmit}
        className='w-full max-w-xl flex flex-col px-5'>
            <Input placeholder='Digite o seu email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>

            <Input placeholder='Digite a sua senha'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            
            <button type='submit'
            className='h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white hover:bg-blue-700 transition-colors duration-300'>
                Acessar
            </button>
        </form>
        </div>
    )
}