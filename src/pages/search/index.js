
import getSuggestions from "services/search"
import Image from "next/image"
import Layout from "@/components/layout"
import Link from "next/link"
import { useI18N } from "context/i18n"


export default function Search({result, query}) {

const {t} = useI18N()


    return (
    <>

        <Layout>
        <h2 className="font-bold text-lg text-center">
            {t("SEARCH-TITLE-RESULTS", result.length, query)}
        </h2>

        <section className=" max-w-md gap-2 m-auto "> 

        <ul className="flex flex-col "> 
            {result.map( comic => {
                    return (
                    <Link key={comic.num} href={`/comics/${comic.num}`}> 
                    <li  className="flex bg-red-400 hover:bg-red-500 mb-2 rounded" key={comic.num}> 
                    <Image alt={comic.img} src={comic.img} width={100} height={100}/> 
                    <h1>{comic.title}</h1>
                    </li>
                    </Link>
                    )


            })}
            </ul>
        </section>

        </Layout>
   
    </>
       
    )
}


export async function getServerSideProps(context) {

const {query: q} = context
const {query} = q
 
const {hits: result}  = await getSuggestions(query)


return {
    props: {result, query}
}

}