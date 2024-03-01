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
  
const AddInventory = () => {
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

    async function addNewInventory(formData: FormData) {

        const name = formData.get('name') as string;
        const desc = formData.get('desc') as string;
        const type = formData.get('type') as string;
        const quantity = formData.get('quantity') as string;
        const status = formData.get('status') as string;

        let payload = { name, desc, type, quantity, status}

        try {
            const response = await axios.post(`http://localhost:3003/api/inventory/add`, payload); // Replace with your API endpoint
            if (response.status === 200) { 
                alert(`Info - Inventory Added Succesfully.`)
            }
            
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        // revalidatePath('/inventory')
        return redirect('/inventory')
    }

  return (
    <form>
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create New Inventory</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create New Inventory</DialogTitle>
                <DialogDescription>
                    Fill the forms below
                </DialogDescription>
                </DialogHeader>

                <div className="gap-y-2 flex flex-col">
                    <form action={addNewInventory}>
                        <div className="gap-y-4 flex flex-col">
                            <Label>Name</Label>
                            <Input
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
                            />

                            <Label>Quantiy</Label>
                            <Input
                                required
                                type='number'
                                name='quantity'
                                placeholder='Write a quantity...'
                                value={(data as any)?.quantity}
                                onChange={handleInputChange}
                            />

                            <Label>Status</Label>
                            <Input
                                required
                                type='text'
                                name='status'
                                placeholder='Write a status...'
                                value={(data as any)?.status}
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