import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import axios from "axios";
import { redirect, useRouter } from 'next/navigation'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'
import toast, { Toaster } from 'react-hot-toast';

const DeleteInventory = ({rowId}:any) => {
    const router = useRouter();
    async function deleteInventory() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/inventory/delete/${rowId}`); // Replace with your API endpoint
            if (response.status === 200) { 
                toast.success(`Inventory Deleted Succesfully.`)
            }
            
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        // router.push('/inventory')
        setTimeout(() => {
            window.location.href = "/inventory";
        }, 1000);
    }

    return (
        <AlertDialog>
            <Toaster/>
            <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the inventory data.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteInventory}>Continue</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteInventory