import React from 'react'
import { Button } from './button'
import axios from 'axios';
import { useState } from 'react';
import { revalidatePath } from 'next/cache';


const UploadBulkInventory = () => {
    const [pending, setPending] = useState(false)
    async function addInventoryRows() {
        try {
            const response = await axios.get(`http://localhost:3003/api/inventory/populate`);
            setPending(true)
            if (response.status === 200) { 
                alert(`Info - Inventory Data populated succesfully (1000 rows)`)
                setPending(false)
            }
        } catch (error) {
            alert(`System Error: ${(error as any).response.data.errMsg}`);
        }

        window.location.href = '/inventory'
    }

    return (
        <>
            <Button variant={"outline"} onClick={addInventoryRows} disabled={pending}>Populate Inventory Data</Button>
        </>
    )
}

export default UploadBulkInventory