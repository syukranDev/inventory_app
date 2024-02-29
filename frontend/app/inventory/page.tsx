"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import AddInventory from "@/components/ui/AddInventory"
import InventoryTable from "@/components/ui/InventoryTable"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import TablePagination from "@/components/ui/TablePagination"


const page = () => {
  const [data, setData] = useState([])
  const [dataCount, setDataCount] = useState(0)

  const searchParams = useSearchParams()
  const searchCurrentPage:any = searchParams.get('page')
  console.log(searchCurrentPage)

  const page:any = parseInt(searchCurrentPage) || 1;
  const pageSize = 5;
  const limit_rows = 5

  //Below effect for first time load
  useEffect(() => {
      const fetchData = async () => {
          
      try {
          console.log(`is this running`)
          let response = await axios.get(`http://localhost:3003/api/inventory/list?page=${page}&limit_rows=${limit_rows}`); // Replace with your API endpoint
          // console.log(response.data.data.rows)
          setData(response.data.data.rows)
          setDataCount(response.data.data.count)
      } catch (error) {
          console.error('Error fetching data:', error);
      }
      };
      fetchData();
  }, []);

  // const updateTableDataAfterAddNewTransaction = async () => {
  //   try {
  //       const response = await axios.get(`http://localhost:3003/api/transaction/list?page=1&user_id=${userId}`);
  //       setData(response.data.data.rows);
  //   } catch (error) {
  //       console.error('Error fetching updated data:', error);
  //   }
  // };

const updateTableDataForBackPagination = async () => {
    try {
        const response = await axios.get(`http://localhost:3003/api/inventory/list?page=`+ (parseInt(page)-1).toString() ); 
        setData(response.data.data.rows);
    } catch (error) {
        console.error('Error fetching next page data:', error);
    }
};

const updateTableDataForForwardPagination = async () => {
    try {
        const response = await axios.get(`http://localhost:3003/api/inventory/list?page=`+ (parseInt(page)+1).toString()); 
        setData(response.data.data.rows);
    } catch (error) {
        console.error('Error fetching next page data:', error);
    }
};

  return (
     <>
        <section className="flex mt-10 h-[90vh]">
                <div className="relative  w-full px-5 mx-auto lg:px-16 max-w-7xl md:px-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex justify-between mb-10">
                            <p></p>
                            <AddInventory/>
                        </div>

                        <InventoryTable contents={data} isDelete={true}/>

                        <TablePagination 
                                    pageSize={pageSize}
                                    itemCount={dataCount}
                                    currentPage={page}
                                    updateTableDataForBackPagination={updateTableDataForBackPagination}
                                    updateTableDataForForwardPagination={updateTableDataForForwardPagination}
                        />
                      
                    </div>
                </div>
        </section>
    </>
  )
}

export default page