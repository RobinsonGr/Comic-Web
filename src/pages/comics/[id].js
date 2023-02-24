import fs from "fs"
import Image from "next/image"
import Link from "next/link"
import Layout from "@/components/layout"



export default function Comics({title, 
    alt, 
    img, 
    hasPrev,
    hasNext,
    idPrev,
    idNext,
}) {



    return (

      <Layout>
            <section className="flex max-w-lg m-auto flex-col justify-center content-center">

            <h1 className="font-bold text-2xl text-center mb-4">{title}</h1>
            <Image alt={alt} src={img} width={500} height={500} ></Image>
            <p>{alt}</p>

            <div className="flex justify-between font-semibold text-lg text-red-500 mt-4"> 
            {hasPrev && <Link href={`/comics/${idPrev}`}> Prev</Link>}
            {hasNext && <Link href={`/comics/${idNext}`}>Next </Link>}
            </div>
            

            </section>

      </Layout>

    )
}




export async function getStaticPaths ({locales}) {


    const comics = await fs.promises.readdir("./comics")




    let paths = []

    locales.forEach(locale => {

        paths = paths.concat(comics.map(comic => {
        
            return {params: {id : comic.replace(".json", "")}, locale}
        }
        ))
        
        })

  
    return {
        paths,
        fallback: false

    }

}


export async function getStaticProps({params}) {

    const {id} = params

    const comicData = JSON.parse(await fs.promises.readFile(`./comics/${id}.json`))


    const idPrev = +id - 1
    const idNext = +id + 1

    const [statPrev, statNext] = await Promise.allSettled ([
        fs.promises.stat(`./comics/${idPrev}.json`),
        fs.promises.stat(`./comics/${idNext}.json`)
    ])


    const hasPrev = statPrev.status === "fulfilled"
    const hasNext = statNext.status === "fulfilled"


    return {
        props: {
            ...comicData,
            hasPrev,
            hasNext,
            idPrev,
            idNext,
        }
    }

}

