
import getSuggestions from "services/search"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"


export default function Header () {


    const [comicsResult, setComicsResult] = useState([])
    const [value, setValue] = useState("")


    const handleSuggestion = async (e) => {

        setValue(e.target.value)

        if(!value) return

        const {hits} = await getSuggestions(value)

        setComicsResult([hits.slice(0, 8), hits.length])

        
    }
    
    const {locale, locales} = useRouter()
    
    const handleLocale = locales.filter(x => x !== locale )
    

    return (

        
        <header className="flex flex-row  justify-between ">
            
            <Link href={"/"}> 
            <h2 className="font-bold hover:opacity-95 text-2xl">Comic <span className="text-red-500">Web</span></h2>    
            </Link>


            <ul className="flex flex-row space-x-2 ">
                <Link href={"/"}> 
                <li className="hover:text-red-500">Home</li>
                </Link>
                <Link href={"/about"}> 
                <li className="hover:text-red-500">About</li>
                </Link>
               
                <li> 
                    <input 
                    className="px-1 focus:bg-red-900 bg-black 
                    text-white border-2 border-red-500 rounded-md outline-none" 
                    onChange={(e) => {handleSuggestion(e)}}></input>

                    {Boolean (comicsResult.length) && value &&  
                    <div className=" w-48 bg-black p-1  absolute text-base z-50">
                        
                        <ul className="z-50">
                            <li>
                                
                            <Link href={`/search?query=${value}`}> 
                
                                <li className="bg-red-500">{`View ${comicsResult[1]} results`}</li>
                                
                            </Link>
                                
                                </li>

                            {comicsResult[0].map(comic => {

                                    return (
                                        <Link key={comic.num} href={`/comics/${comic.num}`}> 
                                        <li>{comic.title}</li>
                                        </Link>
                                    )
                            })}
                        </ul>
                        
                        
                        
                        </div>
                        }
                        

                </li>
                <Link href={"/"} locale={handleLocale[0]}>
                <li className="bg-red-500 w-6 rounded text-center ">{handleLocale[0]}</li>
                </Link>
            </ul>

        </header>
    )
}