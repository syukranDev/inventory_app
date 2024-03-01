import React from 'react'
import Link from 'next/link'
import { FaRegEye } from "react-icons/fa";

const ViewTransaction = ({rowId}: any) => {
  return (
    <>
      <Link href={`/inventory/${rowId}`} className='hover:bg-red-500'>
          <FaRegEye size={20} />
      </Link>
    </>
  )
}

export default ViewTransaction