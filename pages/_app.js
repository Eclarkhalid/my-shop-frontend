import '@/styles/globals.css'
import { Poppins } from 'next/font/google';
import Header from './components/Header';
import { CartContextProvider } from './components/CartContext';

const inter = Poppins({
  subsets: ['latin'],
  weight: '500'
});

export default function App({ Component, pageProps }) {
  return <>
    <CartContextProvider>
      <main className={`${inter.className} min-h-screen max-w-screen-2xl mx-auto bg-background`}>
        <Header />
        <Component {...pageProps} />
      </main>
    </CartContextProvider>
  </>
}
