"use client"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "./button";
import UserNav from "./UserNav";
import { useEffect, useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
 
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

                <div>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Button variant="link">@syukranDev</Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                            <div className="flex justify-between space-x-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/verclel.png" />
                                <AvatarFallback>SS</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">@syukranDev</h4>
                                <p className="text-sm">
                                InventoryApp – created and maintained by @syukranDev.
                                </p>
                                <div className="flex items-center pt-2">
                                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                                <span className="text-xs text-muted-foreground">
                                    Live March 2024
                                </span>
                                </div>
                            </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>

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