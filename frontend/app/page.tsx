"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { redirect, useRouter } from 'next/navigation'
import { revalidatePath } from "next/cache";

let userData: any = localStorage.getItem('data_user') ;
const isLoggedIn: any = localStorage.getItem('isLoggedIn')
userData = JSON.parse(userData)

export default function Home() {
  const router = useRouter();

  async function logoutUser() {
    try {
      const response = await axios.post(`http://localhost:3003/api/auth/logout`, { username: userData.id}); 
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
                  <h1 className="text-6xl font-semibold">

                    {
                      userData?.name ? 
                      (`Welcome, ${userData?.name}`) 
                      : ('InventoryApp')
                    }
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
