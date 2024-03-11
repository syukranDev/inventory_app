"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { redirect, useRouter } from 'next/navigation'
import { revalidatePath } from "next/cache";
import Lottie from 'lottie-react'
import logo_home from '../public/assets/logo_home.json'
import { JSX, SVGProps } from "react";

let userData: any = typeof window !== 'undefined' ? localStorage.getItem('data_user') : null
const isLoggedIn: any = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null
userData = JSON.parse(userData)

export default function Home() {
  const router = useRouter();

  async function logoutUser() {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/auth/logout`, { username: userData.id}); 
      if (response.status === 200){
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('data_user');
        // return router.push('/login');
        window.location.href='/'
      }
    } catch(e) {
      alert(`System Error - ${e}`)
    }         
  }

  return (
    <>
      <section className="flex items-center justify-center bg-background h-[90vh]">
          <div className="relative items-center w-full px-5 mx-auto lg:px-16 max-w-7xl md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              {/* <p>hello</p> */}
              <div className="">
                <div>
                  <div className="text-center">
                    <Lottie animationData={logo_home} className="h-[600px]"/>
                  </div>
                  <h1 className="text-6xl font-semibold mt-5">
                    {
                      userData?.name ? 
                      (`Welcome `) 
                      : ('Welcome to ')
                    }
                    <span className="text-primary">
                    {
                      userData?.name ? 
                      (`${userData?.name}!`) 
                      : (<span className="text-primary">InventoryApp</span>)
                    }
                    </span>
                  </h1>
                </div>
                <h1 className="mt-5 mb-4 text-lg">A simple apps where you can try CRUD on inventory data.</h1>
                {
                  isLoggedIn == 'true' ? 
                  (<Button><Link href={'/inventory'}>To The Inventory</Link></Button>) 
                  : (<Button><Link href={'/login'}>Login</Link></Button>)
                }
                {
                  isLoggedIn == 'true' &&
                  <Button className="ml-2" variant={'outline'}>
                      <Link href={'/inventory'} onClick={logoutUser}>Logout</Link>
                  </Button>
                }
              </div>
          </div>
        </div>
      </section>

      <footer className=" bg-background text-gray py-6">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">© 2024 InventoryApp. Made by <span className="text-primary">@syukranDev</span></p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          {/* <Link className="text-gray-400 hover:text-gray-100 transition-colors" href="#">
            <YoutubeIcon className="h-6 w-6" />
            <span className="sr-only">YouTube</span>
          </Link> */}
          <Link className="text-gray-400 hover:text-gray-100 transition-colors" href="https://www.github.com/syukranDev">
            <GithubIcon className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link className="text-gray-400 hover:text-gray-100 transition-colors" href="#">
            <TwitterIcon className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
      </div>
    </footer>
    </>
    
  );
}


function GithubIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}


function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}