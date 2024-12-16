"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"




const Navbar = () => {
  const pathName=usePathname();
  const isAdmin=pathName.split('/')[1];
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  return (
    <header className='fixed left-0 top-0 right-0 z-50 bg-slate-100 shadow-xl px-10 md:px-20 ' >
      <div className='max-w-7xl mx-auto'>
        <div className='flex gap-x-40 items-center  py-2 mx-auto c-space'>
          <div className="flex items-center gap-4">
            <Link href="/" className=' text-xl text-black/80 nav__el font-semibold'>
              ALL TOURS
            </Link>
            <div className="flex items-center border-b-2 gap-4">
              <button className="bg-none  translate-y-[1px]">
                <svg className="h-6 w-6 fill-slate-300">
                  <use xlinkHref="/img/icons.svg#icon-search"></use>
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search tours"
                className="bg-none border-none bg-transparent  uppercase font-normal pb-[3px] border-b border-black w-44 text-[#444] 
                focus:outline-none focus:border-none "
              />
            </div>

          </div>
          {/* LOGO */}
          <div className="relative">
            <Image className="w-14 h-14 object-contain" src="/img/logo-green-small.png" alt="logo" width={100} height={100} />
          </div>

          <div className="flex gap-4">
            <a href="/my-bookings"
              className=" nav__el"
            >
              MY BOOKINGS
            </a>
            {
              isAdmin === 'admin' && (
                <a href={`/admin/add-tours`} className="rounded-md shadow-md hover:-translate-y-[3px] hover:shadow-xl active:hover:-translate-y-[1px] active:shadow-md bg-blue-500 text-white px-4 py-2">ADD TOURS</a>
              )
            }
            
          </div>

        </div>

      </div>
    </header>
  )
}

export default Navbar
