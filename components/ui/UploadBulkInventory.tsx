import React from 'react'
import { Button } from './button'
import axios from 'axios';
import { useState } from 'react';
import { revalidatePath } from 'next/cache';
import toast, { Toaster } from 'react-hot-toast';

const UploadBulkInventory = () => {
    const [pending, setPending] = useState(false)
    async function addInventoryRows() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/inventory/populate`);
            setPending(true)
            if (response.status === 200) { 
                toast.success(`Inventory Data populated succesfully (1000 rows)`)
                setPending(false)
            }
        } catch (error) {
            toast.error(`System Error: ${(error as any).response.data.errMsg}`);
        }

        setTimeout(() => {
            window.location.href = "/inventory";
        }, 1000); 
    }

    return (
        <>  
            <Toaster/>
            <Button variant={"outline"} onClick={addInventoryRows} disabled={pending}>Populate Inventory Data</Button>
        </>
    )
}

export default UploadBulkInventory