'use client'

import React from 'react'
import { Button } from './button';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { useRouter, useSearchParams } from 'next/navigation'

const TablePagination = ({pageSize, itemCount, currentPage, updateTableDataForBackPagination, updateTableDataForForwardPagination}: any) => {
  // console.log({pageSize, itemCount, currentPage})

  const router = useRouter()
  const searchParams = useSearchParams()

  const pageCount = Math.ceil(itemCount/pageSize)

  const changePage = (page:any) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString()) //combine ?page to existing ?searchby=...&status=.. if any
        router.push('?' + params.toString())

    }

  return (
    <div className='flex justify-between'>
       <p className='m-4'>Total Rows: {itemCount}</p>
        <div className='flex m-2 gap-2'>
            <div className='m-2'>
                <h1>Page {currentPage} of {pageCount}</h1>
            </div>
            {/* <Button color='gray' variant='soft' disabled={currentPage === 1} 
                  onClick={() => {
                    changePage(1)
                    updateTableDataForPagination();
                    }}>
               <DoubleArrowLeftIcon />
            </Button> */}

            <Button size={"sm"}color='gray' disabled={currentPage === 1} onClick={() => {changePage(currentPage - 1); updateTableDataForBackPagination();} }>
               <ChevronLeftIcon />
            </Button>

            <Button size={"sm"} color='gray' disabled={currentPage === pageCount} onClick={() => {changePage(currentPage + 1); updateTableDataForForwardPagination();}}>
               <ChevronRightIcon />
            </Button>

            {/* <Button color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
               <DoubleArrowRightIcon />
            </Button> */}
        </div>
    </div>
  )
}

export default TablePagination