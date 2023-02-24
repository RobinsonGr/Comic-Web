
import Header from  "@/components/Header.js"


export default function Layout({children}) {


    return(

        <>
        <Header/>
        <main>{children}</main>
        
        </>

    )
}