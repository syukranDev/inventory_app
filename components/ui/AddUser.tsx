import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
  } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RocketIcon } from "@radix-ui/react-icons"
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Textarea } from './textarea'
import SubmitButton from './SubmitButton'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { useState, useEffect } from 'react'
  import { redirect } from 'next/navigation'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
  
const AddInventory = () => {
    const [data, setData] = useState({
        username: '',
        password: '',
        role: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    async function addNewInventory(formData: FormData) {

        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const role = formData.get('role') as string;

        let payload = { username, password, role }

        console.log(payload)

        const roles = ['admin', 'guest'];
        if (!username || !password) toast.error('Kindly fill both username and password')
        if (!roles.includes(role)) { toast.error('Invalid role. Only admin @ guest is accepted')}
         else {
             try {
                 const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/user/add`, payload); 
                 if (response.status === 200) { 
                     toast.success(`User Added Succesfully.`)
                 }
             } catch (error) {
                 console.error('Error fetching data:', error);
             }
     
             // revalidatePath('/user')
             setTimeout(() => {
                window.location.href = "/user";
            }, 1000); 
         }
    }

  return (
    <form>
        <Toaster/>
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create New User</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                    Fill the forms below
                </DialogDescription>
                </DialogHeader>

                <div className="gap-y-2 flex flex-col">
                    <form action={addNewInventory}>
                        <div className="gap-y-4 flex flex-col">
                            <Alert className="">
                                <RocketIcon className="h-4 w-4" />
                                <AlertTitle>Info</AlertTitle>
                                <AlertDescription>
                                Permission can be setup in details view upon user creation.
                                </AlertDescription>
                            </Alert>
                            <Label>Username</Label>
                            <Input
                                required
                                type='text'
                                name='username'
                                placeholder='Fill in you desired username'
                                value={(data as any)?.name}
                                onChange={handleInputChange}
                            />

                            <div className='flex flex-col gap-y-2'>
                                <Label>Password</Label>
                                <Input
                                    required
                                    type='password'
                                    name='password'
                                    placeholder='Your password'
                                    value={(data as any)?.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <Label>Role</Label>
                            <Input
                                required
                                type='text'
                                name='role'
                                placeholder='Assigned a role (admin or guest)'
                                value={(data as any)?.type}
                                onChange={handleInputChange}
                            />

                            <DialogFooter className="">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Close</Button>
                                </DialogClose>

                                <SubmitButton title='Add'/>
                            </DialogFooter>
                            
                        </div>
                    </form>
                </div>        
            </DialogContent>
        </Dialog>
    </form>
  )
}

export default AddInventory