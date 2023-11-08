"use client"

import Image from 'next/image'
import { useSession } from "next-auth/react"
import Button from '../atoms/Button';
import { useRouter, usePathname } from 'next/navigation';
import NavItem from '../atoms/NavItem';

export default function NavBar() {
   const { data: session, status } = useSession();
   const router = useRouter();
   const pathName = usePathname();
   const isActive = (path: string) => pathName === path;


   const handleAuthentication = (status: string) => {
      if (status === "authenticated") {
        router.push('api/auth/signout');
      } else {
        router.push('api/auth/signin');
      }
    }

   return(
      <nav className="sticky z-10 w-full bg-slate-200">
         <ul className="container mx-auto px-10 py-2 flex flex-row items-center space-x-6">
               {status === "authenticated" && session?.user && session.user.image && session.user.name && (
                  <li>
                     <Image className="rounded-full" src={session.user.image} alt={session.user.name} width={50} height={50} />
                  </li>
               )}

            <NavItem text="Home" route="/" isActive={isActive('/')} />

            <NavItem text="Favorites" route="/favorites" isActive={isActive('/favorites')} />

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