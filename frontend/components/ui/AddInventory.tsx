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
  

const AddInventory = () => {
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

                

                

                <DialogFooter className="">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Close</Button>
                    </DialogClose>
                    
                    <SubmitButton title='Add'/>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </form>
  )
}

export default AddInventory