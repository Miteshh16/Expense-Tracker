import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"
import SideMenu from './SideMenu'

const Navbar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false)

  return (
    <>
      {/* Navbar */}
      <div className='flex items-center gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 w-full'>
        <button className='block lg:hidden text-black'
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className='text-2xl' />
          ) : (
            <HiOutlineMenu className='text-2xl' />
          )}
        </button>
        <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
      </div>

      {/* Mobile Side Menu */}
      {openSideMenu && (
        <div className='fixed top-16 left-0 z-20 w-64 bg-white h-full border-r border-gray-200'>
          <SideMenu />
        </div>
      )}
    </>
  )
}

export default Navbar
