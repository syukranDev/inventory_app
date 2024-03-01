import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card } from "./card"
import ViewTransaction from "./ViewTransaction"

 
const InventoryTable = ({contents, isDelete}: {contents:any, isDelete:any}) => {
  return (
    <>
        <Card>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                    <TableHead className="">Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contents.map((d:any) => (
                    <TableRow key={d.id}>
                        <TableCell>{d.name}</TableCell>
                        <TableCell>{d.quantity}</TableCell>
                        <TableCell>{d.type}</TableCell>
                        <TableCell className="font-medium">
                            {
                                d.status == 'active' ? 
                                (<Badge variant={'secondary'}>Active</Badge>) 
                                : (<Badge variant={'destructive'}>Inactive</Badge>)
                            }
                        </TableCell>
                        <TableCell><ViewTransaction rowId={d.id}/></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                {/* <TableFooter>
                </TableFooter> */}
            </Table>
        </Card>

    

    </>
  )
}

export default InventoryTable