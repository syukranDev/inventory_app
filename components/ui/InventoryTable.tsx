import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "./card";
import ViewTransaction from "./ViewTransaction";
import { Link } from "lucide-react";
import { Button } from "./button";
import axios from "axios";
import { useState, useEffect } from "react";
import TablePagination from "./TablePagination";

const InventoryTable = ({ contents, isDelete, page, pageSize, dataCount}: { contents: any; isDelete: any, page: any, pageSize: any, dataCount: any }) => {
    console.log(contents)
    const [sortedContents, setSortedContents] = useState(contents);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortColumn, setSortColumn] = useState('')

    useEffect(() => {
        setSortedContents(contents);
    }, [contents]);

    async function sortingTable(column: any) {
        try {
            const newSortOrder = sortOrder === "asc" ? "desc" : "asc";

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/inventory/list?sort_column=${column}&sort_by=${newSortOrder}`);
            if (response.status === 200) {
                console.log(response.data)
                setSortedContents(response.data.data.rows);
                setSortOrder(newSortOrder)
                setSortColumn(column)
            }
        } catch (error) {
            alert(`System Error: ${(error as any).response.data.errMsg}`);
        }
    }

    const updateTableDataForBackPagination = async (column: any) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/inventory/list?page=`+ (parseInt(page)-1).toString() + `&sort_column=${column}&sort_by=${sortOrder}`); 
            setSortedContents(response.data.data.rows);
        } catch (error) {
            console.error('Error fetching next page data:', error);
        }
    };

    const updateTableDataForForwardPagination = async (column: any) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/inventory/list?page=`+ (parseInt(page)+1).toString() + `&sort_column=${column}&sort_by=${sortOrder}`); 
            console.log(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/api/inventory/list?page=`+ (parseInt(page)-1).toString() + `sort_column=${column}&sort_by=${sortOrder}`)
            console.log('===')
            console.log(response.data.data.rows)
            setSortedContents(response.data.data.rows);
        } catch (error) {
            console.error('Error fetching next page data:', error);
        }
    };

    return (
        <>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">
                                <Button variant={"link"} onClick={() => sortingTable("name")}>Name</Button>
                            </TableHead>
                            <TableHead className="text-center">
                                <Button variant={"link"} onClick={() => sortingTable("quantity")}>Quantity</Button>
                            </TableHead>
                            <TableHead className="text-center">
                                <Button variant={"link"} onClick={() => sortingTable("type")}>Type</Button>
                            </TableHead>
                            <TableHead className="text-center">
                                <Button variant={"link"} onClick={() => sortingTable("status")}>status</Button>
                            </TableHead>
                            <TableHead className="text-center">
                                <Button variant={"link"} onClick={() => sortingTable("createdAt")}>Created At</Button>
                            </TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedContents.map((d: any) => (
                            <TableRow key={d.id}>
                                <TableCell>{d.name}</TableCell>
                                <TableCell className="text-center">{d.quantity}</TableCell>
                                <TableCell className="text-center">{d.type}</TableCell>
                                <TableCell className="font-medium text-center">
                                    {d.status === 'active' ? (
                                        <Badge variant={'secondary'}>Active</Badge>
                                    ) : (
                                        <Badge variant={'destructive'}>Inactive</Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-center">{(d.createdAt).split('T')[0]}</TableCell>
                                <TableCell><ViewTransaction rowId={d.id} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <TablePagination 
                                    pageSize={pageSize}
                                    itemCount={dataCount}
                                    currentPage={page}
                                    updateTableDataForBackPagination={() => updateTableDataForBackPagination(sortColumn)}
                                    updateTableDataForForwardPagination={() => updateTableDataForForwardPagination(sortColumn)}
                        />
        </>
    );
};

export default InventoryTable;
 