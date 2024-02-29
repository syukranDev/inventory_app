import { Button } from "@/components/ui/button";
import Link from "next/link";

const loggedInUser = 'Admin'
const isAuth = true

export default function Home() {
  return (
    <>
      <section className="flex items-center justify-center bg-background h-[90vh]">
          <div className="relative items-center w-full px-5 mx-auto lg:px-16 max-w-7xl md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              {/* <p>hello</p> */}
              <div className="">
                <div>
                  <h1 className="text-6xl font-semibold">Welcome, {loggedInUser || 'Anon'}!</h1>
                </div>
                <h1 className="mt-5 mb-4 text-lg">A simple apps where you can try CRUD on inventory data.</h1>
                {
                  loggedInUser ? 
                  (<Button><Link href={'/inventory'}>To The Inventory</Link></Button>) 
                  : (<Button><Link href={'/login'}>Login</Link></Button>)
                }
                {
                  isAuth == true &&
                  <Button className="ml-2" variant={'outline'}>
                      <Link href={'/inventory'}>Logout</Link>
                  </Button>
                }
              </div>
          </div>
        </div>
      </section>
    </>
    
  );
}
