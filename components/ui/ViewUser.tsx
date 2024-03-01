import React from 'react'
import Link from 'next/link'
import { FaRegEye } from "react-icons/fa";

const ViewTransaction = ({rowId}: any) => {
  return (
    <>
      <Link href={`/user/${rowId}`} className='hover:text-red-500 hover:cursor-pointer'>
          {/* <FaRegEye size={20} /> */} More
      </Link>
    </>
  )
}

export default ViewTransaction