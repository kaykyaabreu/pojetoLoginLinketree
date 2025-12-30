import {useEffect, useState} from "react"
import {Social} from "../../components/social";
import {FaFacebook, FaInstagram, FaYoutube}from "react-icons/fa"
import {db} from "../../services/firebaseConection"
import {getDocs, collection, orderBy, query, doc, getDoc} from "firebase/firestore"

interface LinkProps{
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

interface SocialLinkProps{
    facebook: string;
    youtube: string;
    instagram: string;
}

export function Home(){
    const [link,setLink] = useState<LinkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinkProps>()

    useEffect(()=>{
        function loadLinks(){
            const linksRef = collection(db, "links");
            const queryRef = query(linksRef, orderBy("created","asc"))
            
            getDocs(queryRef)
            .then((snapshot)=>{
                let lista = [] as LinkProps[];
            
                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        bg: doc.data().bg,
                        color: doc.data().color,
                    })
                })

                setLink(lista);
                
            })
        }loadLinks();
    },[])

    useEffect(()=>{
    
    function loadSocialLinks(){
        const docRef = doc(db, "social", "links")
    getDoc(docRef)
    .then((snapshot) => {
        if (snapshot.data() !== undefined) {
            setSocialLinks({
                facebook: snapshot.data()?.facebook,
                youtube: snapshot.data()?.youtube,
                instagram: snapshot.data()?.instagram,
            });
            console.log(socialLinks)
        }
    });
    }
    loadSocialLinks()
    },[])

    return(
        <div className="flex flex-col w-full py-4 items-center justify-center" >
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Kayky</h1>
            <span className="text-gray-50 mb-5 mt-3">veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {link.map((Link) => (
                    <section key={Link.id} 
                    style={{backgroundColor: Link.bg, color: Link.color}}
                    className="bg-white mb-4 w-full py-2 rounded-lg select-nome transition-trasform hover:scale-105 cursor-pointer" >
                        <a href={Link.url} target="_blank"><p className="text-base md:text-lg">{Link.name}</p></a>
                    </section>
                ))}
            </main>
            <footer className="flex items-center justify-center my-4 gap-3">
                {socialLinks && Object.keys(socialLinks).length > 0 && (
                
                <>
                <Social url={socialLinks?.facebook}>
                <FaFacebook size={35} color="#fff" />
                </Social>
                <Social url={socialLinks?.youtube}>
                <FaYoutube size={35} color="#fff" />
                </Social>
                <Social url={socialLinks?.instagram}>
                <FaInstagram size={35} color="#fff" />
                </Social>
            </>
                )}
            </footer>
        </div>
    )
}