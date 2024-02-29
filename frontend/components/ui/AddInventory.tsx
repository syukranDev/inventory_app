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

                                        <div className='flex flex-col gap-y-2 mt-2'>
                                            <Label>Description</Label>
                                            <Textarea
                                                required
                                                name='description'
                                                placeholder='Describe your inventory'
                                            />
                                        </div>

                                        <Label className='mt-2'>Type</Label>
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                <SelectItem value="CTN">Carton</SelectItem>
                                                <SelectItem value="PK">Pack</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        <Label className='mt-2'>Quantity</Label>
                                        <Input
                                            required
                                            type='text'
                                            name='title'
                                            placeholder='Write a quantity...'
                                        />

                                        <Label className='mt-2'>Status</Label>
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
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