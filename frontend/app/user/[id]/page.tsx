"use client"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import axios from "axios"
import { redirect, useRouter } from 'next/navigation'
import { revalidatePath } from "next/cache"
import Link from "next/link"
import DeleteUser from "@/components/ui/DeleteUser"
import { useEffect, useState } from "react"
import { Label } from "@radix-ui/react-dropdown-menu"
import SubmitButton from "@/components/ui/SubmitButton"
 
const page = ({ params } : { params: {id : string}}) => {
    const [data, setData] = useState<any>({
        id: '',
        password: '',
        role: '',
        permission_create: '',
        permission_view: '',
        permission_update: '',
        permission_delete: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    };

    async function updateExistingUser(formData: FormData) {
        const id = params.id
        const password = formData.get('password') as string;
        const role = formData.get('role') as string;
        const permission_create = formData.get('permission_create') as string;
        const permission_view = formData.get('permission_view') as string;
        const permission_update = formData.get('permission_update') as string;
        const permission_delete = formData.get('permission_delete') as string;

        let payload = { id, password, role, permission_create, permission_view, permission_update, permission_delete }

        try {
            const response = await axios.post(`http://localhost:3003/api/user/update/${params.id}`, payload); // Replace with your API endpoint
            if (response.status === 200) { 
                alert(`Info - User Updated Succesfully.`)
            }
        } catch (error) {
            alert('System Error');
        }

        // revalidatePath('/inventory') // adding in case no update found upon head to /dashboard due to cache
        return redirect('/user')
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get(`http://localhost:3003/api/user/o/${params.id}`); // Replace with your API endpoint
                
                setData(response.data.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    console.log(data)

  return (
    <>
      <section className="flex mt-10 h-[90vh]">
          <div className="relative  w-full px-5 mx-auto lg:px-16 max-w-7xl md:px-12">
              <div className="max-w-3xl mx-auto">
              <div className="flex justify-between mb-5">
                <Button>
                    <Link href={'/user'}>Go Back</Link>
                </Button>
                <DeleteUser rowId={params.id}/>
            </div>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-center mt-5">View Users</CardTitle>
                  <CardDescription className="text-center">User ID: {data.id}</CardDescription>
                </CardHeader>
                <CardContent>
                <form action={updateExistingUser}>
                                <CardContent className='flex flex-col gap-y-5'>
                                    <div className="gap-y-2 flex flex-col">
                                        <Label>Name</Label>
                                        <Input
                                            disabled={true}
                                            required
                                            type='text'
                                            name='username'
                                            placeholder='Write a username'
                                            value={(data as any)?.id}
                                            onChange={handleInputChange}
                                        />

                                        <Label>Password</Label>
                                        <Input
                                            required
                                            type='text'
                                            name='password'
                                            placeholder='Write a password'
                                            value={(data as any)?.password}
                                            onChange={handleInputChange}
                                        />

                                        <Label>Role</Label>
                                        <Input
                                            required
                                            type='text'
                                            name='role'
                                            placeholder='Write a role...'
                                            value={(data as any)?.role}
                                            onChange={handleInputChange}
                                            disabled={true}
                                        />

                                        <Label>Permissions</Label>
                                        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <h1 className="text-sm">VIEW</h1>
                                                <p className="text-sm font-semibold`">
                                                This allow user to view inventory/user
                                                </p>
                                            </div>
                                            <div>
                                                <Input
                                                    required
                                                    type='text'
                                                    name='permission_view'
                                                    placeholder='false/true'
                                                    value={data.permission_view}
                                                    onChange={handleInputChange}
                                                    className="w-[100px]"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <h1 className="text-sm">CREATE</h1>
                                                <p className="text-sm font-semibold`">
                                                This allow user to create inventory/user
                                                </p>
                                            </div>
                                            <div>
                                                <Input
                                                    required
                                                    type='text'
                                                    name='permission_create'
                                                    placeholder='false/true'
                                                    value={data.permission_create}
                                                    onChange={handleInputChange}
                                                    className="w-[100px]"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <h1 className="text-sm">UPDATE</h1>
                                                <p className="text-sm font-semibold`">
                                                This allow user to UPDATE inventory/user
                                                </p>
                                            </div>
                                            <div>
                                                <Input
                                                    required
                                                    type='text'
                                                    name='permission_update'
                                                    placeholder='false/true'
                                                    value={data.permission_update}
                                                    onChange={handleInputChange}
                                                    className="w-[100px]"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <h1 className="text-sm">DELETE</h1>
                                                <p className="text-sm font-semibold`">
                                                This allow user to DELETE inventory/user
                                                </p>
                                            </div>
                                            <div>
                                                <Input
                                                    required
                                                    type='text'
                                                    name='permission_delete'
                                                    placeholder='false/true'
                                                    value={data.permission_delete}
                                                    onChange={handleInputChange}
                                                    className="w-[100px]"
                                                />
                                            </div>
                                        </div>

                                        {/* <Label>Status</Label>
                                        <Input
                                            required
                                            type='text'
                                            name='status'
                                            placeholder='Write a status...'
                                            value={(data as any)?.status}
                                            onChange={handleInputChange}
                                        /> */}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <div></div>
                                    <SubmitButton title={'Update'}/>
                                </CardFooter>
                                </form>
                </CardContent>
              </Card>
              </div>
            </div>
      </section>

    </>
    
  )
}

export default page