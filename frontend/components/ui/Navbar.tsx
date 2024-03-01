"use client"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "./button";
// import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
// import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./UserNav";

let user = {
    email: 'admin@myapp.com',
    picture: '',
    given_name: 'admin'
}

let userData: any = localStorage.getItem('data_user') ;
const isLoggedIn: any = localStorage.getItem('isLoggedIn')
userData = JSON.parse(userData)


const Navbar = () => {
    // const { isAuthenticated, getUser } = getKindeServerSession();
    // const user = await getUser();
    // console.log({user})

    return (
        <nav className='border-b bg-background h-[6vh] flex items-center'>
            <div className="container flex items-center justify-between">
                <Link href='/'>
                    <h1 className="font-bold text-3xl">Inventory<span className="text-primary">App</span></h1>
                </Link>

                <div className="flex items-center gap-x-5">
                    <ThemeToggle/>

                    { 
                        (isLoggedIn == 'true')? (
                            <UserNav email={'dummy@gmail.com'} image={'https://github.com/shadcn.png'} name={userData?.name as string} />
                        ) : (
                            <div className="flex items-center gap-x-5">
                                    <Link href={'/login'}>
                                        <Button>Sign in</Button>
                                    </Link>
                                
                                    {/* <Button variant={'secondary'}>
                                    Sign up
                                    </Button> */}
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar