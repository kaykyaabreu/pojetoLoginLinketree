
import {useState} from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { useEffect } from "react";
import {db} from "../../services/firebaseConection";
import { collection, addDoc, setDoc, getDoc, doc } from "firebase/firestore";
import type { FormEvent } from "react";

export function Networks() {
    const [facebook, setFacebook] = useState("123");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYoutube] = useState("");

    useEffect(() => {
    function loadLinks() {
        const docRef = doc(db, "social", "links");
        getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data !== undefined) {
                    setFacebook(snapshot.data()?.facebook);
                    setInstagram(snapshot.data()?.instagram);
                    setYoutube(snapshot.data()?.youtube);
                }
            })
            .catch((error) => {
                console.log("ERRO:", error);
            });
    }

        loadLinks();
    }, []);

    function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setDoc(doc(db, "social", "links"), {
        facebook: facebook,
        instagram: instagram,
        youtube: youtube,
    })
    .then(() => {
        console.log("Links cadastrados com sucesso");
    })
    .catch((error) => {
        console.log("Erro ao cadastrar links:", error);
    });
}
    

    return (
        <div className="flex  flex-col min-h-screen pb-7 px-2">
            <Header/>
            <div className="">₢

                <h1 className="text-2xl font-medium text-center mt-8 mb-4 text-white">Minhas Redes Sociais</h1>
                
                <form action="" className=" flex flex-col max-w-xl w-full m-auto" onSubmit={handleRegister}>
                    <label htmlFor="" className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                    <Input 
                    type="url"
                    placeholder="digite a url do facebook"
                    onChange={(e)=> setFacebook(e.target.value)}
                    value={facebook}/>

                    <label htmlFor="" className="text-white font-medium mt-2 mb-2">Link do instagram</label>
                    <Input 
                    type="url"
                    placeholder="digite a url do instagram"
                    onChange={(e)=> setInstagram(e.target.value)}
                    value={instagram}/>
                    <label htmlFor="" className="text-white font-medium mt-2 mb-2">Link do youtube</label>
                    <Input 
                    type="url"
                    placeholder="digite a url do youtube"
                    onChange={(e)=> setYoutube(e.target.value)}
                    value={youtube}/>

                    <button type="submit" className="text-white bg-blue-600 items-center justify-center flex mb-7 font-medium">salvar links</button>
                </form>
            </div>
        </div>
    )
}