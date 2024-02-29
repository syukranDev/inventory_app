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

const Navbar = async () => {
    // const { isAuthenticated, getUser } = getKindeServerSession();
    // const user = await getUser();
    // console.log({user})

    let isUserLoggedIn = true;

    return (
        <nav className='border-b bg-background h-[6vh] flex items-center'>
            <div className="container flex items-center justify-between">
                <Link href='/'>
                    <h1 className="font-bold text-3xl">Inventory<span className="text-primary">App</span></h1>
                </Link>

                <div className="flex items-center gap-x-5">
                    <ThemeToggle/>

                    { 
                        (isUserLoggedIn)? (
                            <UserNav email={user?.email as string} image={user?.picture as string} name={user?.given_name as string} />
                        ) : (
                            <div className="flex items-center gap-x-5">
                                    <Button>Sign in</Button>
                                
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