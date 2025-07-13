import React ,{ useState } from 'react'
import { Link } from 'react-router-dom';

function NavBar() {

  const [menuOpen , setMenuOpen] = useState(false);



  return (
    <div>
      <header className='w-full fixed top-0 z-50 py-5 md:shadow-sm md:shadow-orange-500'>
        <div className='flex md:justify-around items-center md:w-full w-[90%] mx-auto'>
            <div>
                <Link to={"/"} className='md:text-xl text-l font-semibold'><span className='text-orange-400'>T</span>rack-View</Link>
            </div>
            <nav className='hidden md:flex'>
                <Link to={"/"} className='relative px-4 py-2 mx-4 text-gray-700 after:absolute after:left-1/2 after:-bottom-0 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-orange-400 after:transition-all after:duration-300 after:ease-in-out hover:after:w-1/3 cursor-pointer hover:bg-gray-100 rounded-lg duration-300'>Home</Link>
                <Link to={"/pricing"} className='relative px-4 py-2 mx-4 text-gray-700 after:absolute after:left-1/2 after:-bottom-0 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-orange-400 after:transition-all after:duration-300 after:ease-in-out hover:after:w-1/3 cursor-pointer hover:bg-gray-100 rounded-lg duration-300'>Pricing</Link>
                <Link to={"/demo"} className='relative px-4 py-2 mx-4 text-gray-700 after:absolute after:left-1/2 after:-bottom-0 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-orange-400 after:transition-all after:duration-300 after:ease-in-out hover:after:w-1/3 cursor-pointer hover:bg-gray-100 rounded-lg duration-300'>Demo</Link>
            </nav>
            <div className='hidden md:flex'>
                <Link to={"/login"} className='px-4 py-2 mx-2 hover:bg-gray-100 rounded-lg duration-300'>Login</Link>
                <Link to={"/signup"} className='px-4 py-2 bg-orange-500 rounded-xl text-white hover:opacity-95 duration-300'>Started creating now</Link>
            </div>
        </div>
      </header>
    </div>
  )
}

export default NavBar
