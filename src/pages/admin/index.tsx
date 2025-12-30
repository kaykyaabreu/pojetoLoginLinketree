import {Header} from '../../components/header';
import { Input } from '../../components/input';
import {FiTrash} from "react-icons/fi"
import type { FormEvent } from 'react';
import { useEffect } from 'react';
import {useState} from 'react';
import {addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc} from "firebase/firestore"
import {db} from "../../services/firebaseConection"

interface LinkProps{
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin() {
    const [nameInput, setNameInput] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [textColorInput, setTextColorInput] = useState('#000000');
    const [backgroundColorInput, setBackgroundColorInput] = useState('#ffffff');

    const [links, setLinks] = useState<LinkProps[]>([]);


    useEffect(()=>{
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        const unsub = onSnapshot(queryRef, (snapshot)=>{
            console.log("Snapshot recebido:", snapshot);
            console.log("Snapshot size:", snapshot.size);
            let lista = [] as LinkProps[];
            snapshot.forEach((doc)=>{
                console.log("Doc:", doc.id, doc.data());
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            });
            setLinks(lista)
            console.log("Lista final:", lista);
        });
        return()=>{
            unsub();
        }
    },[])

    async function handleDeleteLink(id:string){
        const docRef = doc(db, "links", id);
        await deleteDoc(docRef)
        .then(()=>{
            console.log("Link deletado com sucesso");
        })
        .catch((error)=>{
            console.log("Erro ao deletar link: ", error);
        })
        
    }
    //pode ser uma função asincrona com await
    function handleRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(nameInput === "" || urlInput === ""){
            alert("Preencha todos os campos!");
            return;}

        addDoc(collection(db, "links"),{
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date()
        })

        .then(()=>{
            setNameInput('');
            setUrlInput('');
            console.log("cadastrado com sucesso");
            
        })

        .catch((error)=>{
            console.log("Erro ao cadastrar link: ", error);
        })


    }

    return (
        <div className=" flex  flex-col min-h-screen pb-7 px-2" >
            <Header />
            
            <form action="" className='flex flex-col mt-8 mb-3 w-full max-w-xl m-auto' onSubmit={handleRegister}>
                <label htmlFor="#" className='text-white font-medium mt-2 mb-2'>Nome do Link</label>
                <Input
                placeholder='digite o nome do link'
                value={nameInput}
                onChange={(e)=> setNameInput(e.target.value)}/>

                <label htmlFor="url-link" className='text-white font-medium mt-2 mb-2'>URL do link</label>
                <Input
                id="url-link"
                type='url'
                placeholder='digite a URL'
                value={urlInput}
                onChange={(e)=> setUrlInput(e.target.value)}
/>
                <section className='flex my-4 gap-5'>
                    <div className='flex gap-2'>
                        <label htmlFor="1" className='text-white font-medium mt-2 mb-2'>Cor do Link</label>
                        <input type="color" className=' rounded-md' id='1'
                        value={textColorInput}
                        onChange={(e)=> setTextColorInput(e.target.value)}/>
                    </div>

                    <div className='flex gap-2'>
                        <label htmlFor="2" className='text-white font-medium mt-2 mb-2'>Fundo do Link</label>
                        <input type="color" className=' rounded-md' id='2'
                        value={backgroundColorInput}
                        onChange={(e)=> setBackgroundColorInput(e.target.value)}/>
                    </div>

                </section>
                    {nameInput !== "" && <div className=' flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md'>
                        <label htmlFor="Nome do Link" className='text-white font-medium mt-2 mb-3'>Veja Como esta ficando:</label>
                        <article 
                        className='w-11/12 max-w-lg flex flex-col items-center justify-center bg-zinc-900 rounded px-1 py-3'
                        style={{marginBottom: 8, marginTop:8, backgroundColor: backgroundColorInput, color: textColorInput}}>
                            <p className='font-medium' >{nameInput}</p>
                        </article>
                    </div>}
                    
                    <button type='submit' className='mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex items-center justify-center mb-7'>Cadastrar</button>
            </form>
            <div className='flex flex-col items-center justify-center mb-4'>
                <h2 className='font-bold text-white mb-4 text-2xl'>Meus Links</h2>
                {links.length === 0 ? (
                    <p className='text-white'>Nenhum link cadastrado.</p>
                ) : (
                    links.map((link) => (
                        <article key={link.id}
                            className='w-11/12 max-w-lg flex items-center justify-between rounded py-3 px-2 mb-2 select-nome'
                            style={{marginBottom: 8, marginTop:8, backgroundColor: link.bg, color: link.color}}>
                            <p className='font-medium'>{link.name}</p>
                            <div>
                                <button className='border border-dashed p-1 rounded bg-neutral-900 text-white cursor-pointer'
                                onClick={()=>handleDeleteLink(link.id)}>
                                    <FiTrash/ >
                                </button>
                            </div>
                        </article>
                    ))
                )}
            </div>

            
        </div>
    )
}