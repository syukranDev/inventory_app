"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import SubmitButton from "@/components/ui/SubmitButton"
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState} from "react"
import axios from "axios"
import { redirect } from 'next/navigation'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RocketIcon } from "@radix-ui/react-icons"
import DeleteInventory from "@/components/ui/DeleteInventory"
import Image from "next/image"

let isLoggedIn: any = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;
let userData: any = typeof window !== 'undefined' ? localStorage.getItem('data_user') : null
userData = JSON.parse(userData)

const page = ({ params } : { params: {id : string}}) => {
    if(isLoggedIn !== 'true') redirect('/');

    const [data, setData] = useState({
        name: '',
        desc: '',
        type: '',
        quantity: '',
        status: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({
        ...prevData,
        [name]: value
    }));
    };

    async function updateExistingInventory(formData: FormData) {

        const name = formData.get('name') as string;
        const desc = formData.get('desc') as string;
        const type = formData.get('type') as string;
        const quantity = formData.get('quantity') as string;
        const status = formData.get('status') as string;

        let payload = { desc, type, quantity, status}

        const booleanS = ['active', 'inactive'];
        if (!booleanS.includes(status)) { toast.error('Invalid string. Only active @ inactive is accepted') }
        else {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/inventory/update/${params.id}`, payload); // Replace with your API endpoint
                if (response.status === 200) { 
                    // alert(`Info - Inventory Updated Succesfully.`)
                    toast.success('Inventory updated succesfully');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            setTimeout(() => {
                window.location.href = "/inventory";
            }, 1000); 
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/inventory/o/${params.id}`); // Replace with your API endpoint
                
                setData(response.data.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Toaster />
            <section className="flex mt-10 h-[90vh]">
                    <div className="relative  w-full px-5 mx-auto lg:px-16 max-w-7xl md:px-12">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex justify-between mb-5">
                                <Button>
                                    <Link href={'/inventory'}>Go Back</Link>
                                </Button>
                                {
                                    userData.permission_delete == 'true' && <DeleteInventory rowId={params.id}/>
                                }
                                
                            </div>

                            <Card>
                                <form action={updateExistingInventory}>
                                <CardHeader className="text-center">
                                    <CardTitle>Inventory Details</CardTitle>
                                    <CardDescription>Item ID - {params.id}</CardDescription>
                                </CardHeader>
                                <CardContent className='flex flex-col gap-y-5'>
                                    <div className="gap-y-2 flex flex-col">
                                        <div className="flex justify-center items-center h-full">
                                            <Image 
                                                src={'https://i.ibb.co/dLRr1mN/packaging-boxes-stacked-pallets-storage-warehouse-supply-chain-storehouse-shipping-warehouse-36860-1.jpg'}
                                                alt={'sfg'}
                                                height={200}
                                                width={400}
                                                className="rounded-md"
                                            ></Image>
                                        </div>
                                        <Label>Name</Label>
                                        <Input
                                            disabled={true}
                                            required
                                            type='text'
                                            name='name'
                                            placeholder='Title of your inventory'
                                            value={(data as any)?.name}
                                            onChange={handleInputChange}
                                        />

                                        <div className='flex flex-col gap-y-2'>
                                            <Label>Description</Label>
                                            <Textarea
                                                required
                                                name='desc'
                                                placeholder='Describe your inventory here'
                                                value={(data as any)?.desc}
                                                onChange={handleInputChange}
                                                disabled={userData.permission_update == 'true' ? false : true}
                                            />
                                        </div>

                                        <Label>Type</Label>
                                        <Input
                                            required
                                            type='text'
                                            name='type'
                                            placeholder='Write a type...'
                                            value={(data as any)?.type}
                                            onChange={handleInputChange}
                                            disabled={userData.permission_update == 'true' ? false : true}
                                        />

                                        <Label>Quantiy</Label>
                                        <Input
                                            required
                                            type='number'
                                            name='quantity'
                                            placeholder='Write a quantity...'
                                            value={(data as any)?.quantity}
                                            onChange={handleInputChange}
                                            disabled={userData.permission_update == 'true' ? false : true}
                                        />

                                        <Label>Status</Label>
                                        <Input
                                            required
                                            type='text'
                                            name='status'
                                            placeholder='Write a status...'
                                            value={(data as any)?.status}
                                            onChange={handleInputChange}
                                            disabled={userData.permission_update == 'true' ? false : true}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <div></div>
                                    {
                                        userData.permission_update == 'true' && <SubmitButton title={'Update'}/>
                                    }
                                </CardFooter>
                                </form>
                            </Card>
                            <Alert className="mt-5">
                                <RocketIcon className="h-4 w-4" />
                                <AlertTitle>Info</AlertTitle>
                                <AlertDescription>
                                 • Name is disabled (on purpose) <br/>
                                 • Static image is used for this view (on purpose) <br/>
                                 • Status accepts 'active' or 'inactive' only <br/>
                                </AlertDescription>
                            </Alert>
                        </div>
                    </div>
            </section>
        </>
    )
}

export default page