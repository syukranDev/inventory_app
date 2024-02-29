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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  



const page = ({ params } : { params: {id : string}}) => {
    const toastNow = () => toast("Wow so easy!");

    async function updateExistingInventory(formData: FormData) {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        alert(title + description);

        toastNow();

        
    }

    return (
        <>
            <ToastContainer />
            <section className="flex mt-10 h-[90vh]">
                    <div className="relative  w-full px-5 mx-auto lg:px-16 max-w-7xl md:px-12">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex justify-between mb-10">
                                <Button>
                                    <Link href={'/inventory'}>Go Back</Link>
                                </Button>
                                <Button variant={"destructive"}>
                                    Delete
                                </Button>

                            </div>


                            <Card>
                                <form action={updateExistingInventory}>
                                <CardHeader className="text-center">
                                    <CardTitle>Inventory Details</CardTitle>
                                    <CardDescription>Item - #{params.id}</CardDescription>
                                </CardHeader>
                                <CardContent className='flex flex-col gap-y-5'>
                                    <div className="gap-y-2 flex flex-col">
                                        <Label>Name</Label>
                                        <Input
                                            required
                                            type='text'
                                            name='title'
                                            placeholder='Title of your inventory'
                                        />

                                        <div className='flex flex-col gap-y-2'>
                                            <Label>Description</Label>
                                            <Textarea
                                                required
                                                name='description'
                                                placeholder='Describe your inventory here'
                                            />
                                        </div>

                                        <Label>Type</Label>
                                        <Input
                                            required
                                            type='text'
                                            name='type'
                                            placeholder='Write a type...'
                                        />

                                        <Label>Quantiy</Label>
                                        <Input
                                            required
                                            type='text'
                                            name='title'
                                            placeholder='Write a quantity...'
                                        />

                                        <Label>Status</Label>
                                        <Input
                                            required
                                            type='text'
                                            name='status'
                                            placeholder='Write a status...'
                                        />

                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <div></div>
                                    <SubmitButton title={'Update'}/>
                                </CardFooter>
                                </form>
                            </Card>

                        </div>
                    </div>
            </section>
        </>
    )
}

export default page