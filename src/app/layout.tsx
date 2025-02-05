"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/navbar";
import Footer from "./components/footer";
import Bottom from "./components/bottom";
import { Provider } from 'react-redux';
import store from '@/app/redux/store';
import Cart from "@/app/components/cart";




 


const inter = Inter({ subsets: ["latin"] });




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
    
    <html lang="en" className="max-w-[1920px]">
      
      <body className={inter.className} >
        <Header />
        <Cart /> 
        {children}
        <Footer />
        <Bottom />
        </body>
    </html>
    </Provider>
    
  );
}

 