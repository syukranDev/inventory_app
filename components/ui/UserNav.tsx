import { Button } from './button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuGroup,DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator} from '../ui/dropdown-menu'
import Link from 'next/link'
import { CreditCard, DoorClosed, Home, Settings } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const navItems = [
    { name: 'Inventory', href: '/inventory', icon: Home},
    { name: 'User', href: '/user', icon: Settings},
]

const UserNav = ({id, name, email, image}: {id: string, name: string, email: string, image: string}) => {
    const router = useRouter();

    async function logoutUser() {

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/auth/logout`, { username: id}); 
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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className='relative h-10 w-10 rounded-full'>
                    <Avatar className='h-10 w-10 rounded-full'>
                        <AvatarImage src={image} alt="" />
                        <AvatarFallback>N/A</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                className='w-56' 
                align='end' 
                forceMount
            >
                <DropdownMenuLabel>
                    <div className="flex justify-between space-x-1">
                        <p className='text-sm font-medium leading-none'>{name}</p>
                        <p className='text-xs leading-none text-muted-foreground'>{email}</p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator/>

                <DropdownMenuGroup>
                    {
                        navItems.map((item, index) => (
                            <DropdownMenuItem asChild key={index}>
                                <Link 
                                    href={item.href} 
                                    className='w-ful flex justify-between items-center'
                                    aria-disabled="true"
                                >
                                    {item.name}
                                    <span><item.icon className='w-4 h--4'/></span>
                                </Link>

                            </DropdownMenuItem>
                        ))
                    }

                </DropdownMenuGroup>

                <DropdownMenuSeparator/>

                <DropdownMenuItem className='w-full flex justify-between items-center' asChild>
                    <div onClick={logoutUser}>
                        Logout{" "}
                        <span><DoorClosed className='w-4 h-4'/></span>
                    </div>

                </DropdownMenuItem>



            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNav