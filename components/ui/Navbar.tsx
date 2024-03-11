"use client"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "./button";
import UserNav from "./UserNav";
import { useEffect, useState } from "react";
 
type UserData = {
    picture: string;
    name: string;
    status: string;
    id: string;
}

const Navbar = () => {
    const [data, setData] = useState('');
    const [userData, setUserData] = useState<UserData | null>(null); 

    useEffect(() => {
        let userDataFromLocalStorage: string | null = localStorage.getItem('data_user');
        let isLoggedIn: string | null = localStorage.getItem('isLoggedIn');

        setData(isLoggedIn || ''); 
        setUserData(userDataFromLocalStorage ? JSON.parse(userDataFromLocalStorage) : null);
    }, []);

    return (
        <nav className='border-b bg-background h-[6vh] flex items-center'>
            <div className="container flex items-center justify-between">
                <Link href='/'>
                    <h1 className="font-bold text-3xl">Inventory<span className="text-primary">App</span></h1>
                </Link>

                <div className="flex items-center gap-x-5">
                    <ThemeToggle/>

                    { 
                        (data === 'true') && userData ? (
                            <UserNav id={userData.id} email={userData.status} image={userData.picture} name={userData.name } />
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

export default Navbar;