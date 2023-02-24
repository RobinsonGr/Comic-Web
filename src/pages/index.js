import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link.js'
import Header from "../components/Header.js"
import Layout from '@/components/layout.js'
import { useI18N } from 'context/i18n.js'

import fs from "fs"

export default function Home({allComics, suggestion}) {

  const {t} = useI18N()

  return (
    
      <Layout>
       
         <h1
         className="mb-10 text-3xl font-bold text-center text-red"
         >{t("LATEST-MAIN-TITLE")}</h1>

  <section className="grid max-w-xl m-auto grid-cols-1 gap-2 m-auto- sm:grid-cols-2 md:grid-cols-3">     
      {
        allComics.map( comic => {

          return (
          <div key={comic.num}className='flex justify-center' > 
          <Link href={`comics/${comic.num}`}>  
          <div className='m-auto'> 
          <h2 className='text-sm font-bold text-center'>{comic.title}</h2>
          <Image alt={comic.alt} width={450} height={450} src={comic.img}  ></Image>
          </div>
          </Link>
          </div>
            
        
          )

        } 

        )

      }
      </section>
       </Layout>

    
  )
}


export async function getStaticProps() {

const comicsName = await fs.promises.readdir(`./comics`)
const lastComic = comicsName.slice(-8).reverse()

const allComics = await Promise.all(lastComic.map(async comic => {
  

  const comicJson = await fs.promises.readFile(`./comics/${comic}`)

  return JSON.parse(comicJson)
  
  
  
}) ) 


return {
  props: {allComics}
}


}