import { useRouter } from "next/router";
import { useContext, createContext } from "react";
import es from "translate/es.json"
import en from "translate/en.json"
import { useCallback } from "react"


const lang = {es, en} 

const I18NContext = createContext()


export default function I18NProvider({children}) {

    const {locale} = useRouter()
    
    const t = useCallback(
        (key, ...args) => {
        
            let translation = lang[locale][key]
    
            if(!args.length) {return translation}
    
            args.forEach ((value, index) => {
                
              translation = translation.replace( `\${${index + 1}}` , value)
    
            })

                

            return translation
    
        }, [locale]
    )


return (

    <I18NContext.Provider value={{t}}>
        {children}
    </I18NContext.Provider>

)
}



export function useI18N() {

    const context = useContext(I18NContext)

    if(context === "undefined") {
        throw new Error ("Context most be withinI18N Provider")
    }

return context

}





