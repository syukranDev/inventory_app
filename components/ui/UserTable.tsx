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
import ViewUser from "./ViewUser"

 
const InventoryTable = ({contents, isDelete}: {contents:any, isDelete:any}) => {
  return (
    <>
        <Card>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                    <TableHead className="">USERNAME</TableHead>
                    <TableHead>ROLE</TableHead>
                    <TableHead className="text-center">CREATE</TableHead>
                    <TableHead className="text-center">VIEW</TableHead>
                    <TableHead className="text-center">UPDATE</TableHead>
                    <TableHead className="text-center">DELETE</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contents.map((d:any) => (
                    <TableRow key={d.id}>
                        <TableCell>{d.id}</TableCell>
                        <TableCell>{d.role}</TableCell>
                        <TableCell className="font-medium text-center">
                            {
                                d.permission_create == 'true' ? 
                                (<Badge variant={'secondary'}>True</Badge>) 
                                : (<Badge variant={'destructive'}>False</Badge>)
                            }
                        </TableCell>
                        <TableCell className="font-medium text-center">
                            {
                                d.permission_view == 'true' ? 
                                (<Badge variant={'secondary'}>True</Badge>) 
                                : (<Badge variant={'destructive'}>False</Badge>)
                            }
                        </TableCell>
                        <TableCell className="font-medium text-center">
                            {
                                d.permission_update == 'true'? 
                                (<Badge variant={'secondary'}>True</Badge>) 
                                : (<Badge variant={'destructive'}>False</Badge>)
                            }
                        </TableCell>
                        <TableCell className="font-medium text-center">
                            {
                                d.permission_delete == 'true' ? 
                                (<Badge variant={'secondary'}>True</Badge>) 
                                : (<Badge variant={'destructive'}>False</Badge>)
                            }
                        </TableCell>
                        <TableCell className="font-medium text-center">
                            {
                                d.status == 'active' ? 
                                (<Badge variant={'secondary'}>Active</Badge>) 
                                : (<Badge variant={'destructive'}>Inactive</Badge>)
                            }
                        </TableCell>
                        <TableCell><ViewUser rowId={d.id}/></TableCell>
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