import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import AddInventory from "@/components/ui/AddInventory"
import InventoryTable from "@/components/ui/InventoryTable"



const page = () => {
  return (
     <>
        <section className="flex mt-10 h-[90vh]">
                <div className="relative  w-full px-5 mx-auto lg:px-16 max-w-7xl md:px-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex justify-between mb-10">
                            <p></p>
                            <AddInventory/>
                        </div>

                        <InventoryTable/>
                      
                    </div>
                </div>
        </section>
    </>
  )
}

export default page