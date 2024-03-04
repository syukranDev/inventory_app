"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { redirect, useRouter } from 'next/navigation'
import { revalidatePath } from "next/cache";
import Lottie from 'lottie-react'
import logo_home from '../public/assets/logo_home.json'

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
    </>
    
  );
}
