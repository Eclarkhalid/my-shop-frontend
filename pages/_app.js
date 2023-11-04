import '@/styles/globals.css'
import { Poppins } from 'next/font/google';
import Header from './components/Header';
import { CartContextProvider } from '../lib/CartContext';
import { SessionProvider } from "next-auth/react"
import { Toaster } from 'react-hot-toast';

const inter = Poppins({
  subsets: ['latin'],
  weight: '500'
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return <>
  <SessionProvider session={session}>
    <CartContextProvider>
      <main className={`${inter.className} min-h-screen max-w-screen-2xl mx-auto bg-background sm:px-6`}>
        <Header />
        <Toaster position='top-center' />
        <Component {...pageProps} className="sm:mt-36" />
      </main>
    </CartContextProvider>
    </SessionProvider>
  </>
}
