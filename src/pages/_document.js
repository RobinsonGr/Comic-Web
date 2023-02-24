import { Html, Head, Main, NextScript } from 'next/document'



export default function Document() {
  return (
    <Html lang="en">

      <Head/>      
      <body className='bg-black text-white m-4 min-w-max'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
