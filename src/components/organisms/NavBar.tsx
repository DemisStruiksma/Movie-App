"use client"

import Image from 'next/image'
import { useSession } from "next-auth/react"
import Button from '../atoms/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NavBar() {
   const { data: session, status } = useSession();
   const router = useRouter();

   const handleAuthentication = (status: string) => {
      if (status === "authenticated") {
        router.push('api/auth/signout');
      } else {
        router.push('api/auth/signin');
      }
    }
   
   return(
      <nav className="z-10 sticky w-full px-10 py-2 bg-slate-200">
         <ul className="flex flex-row items-center space-x-6">
            <li>
               {status === "authenticated" && session?.user && session.user.image && session.user.name && (
                  <><Image className="rounded-full" src={session.user.image} alt={session.user.name} width={50} height={50} /></>
               )}
            </li>

            <li><Link href="/">Home</Link></li>

            <li><Link href="/favorites">Favorites</Link></li>

            <li>
               {status !== "authenticated" ?
                  <Button text="Login" type="button" onClick={() => handleAuthentication(status)} customClassNames="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg" /> : 
                  <Button text="Logout" type="button" onClick={() => handleAuthentication(status)} customClassNames="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg"/>
               }  
            </li>
         </ul>
      </nav>
   )
}