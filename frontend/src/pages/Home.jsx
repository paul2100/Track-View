import React from 'react'
import NavBar from '../components/NavBar'


function Home() {
  return (
    <div>
      <NavBar/>
      <div className='md:mt-30 mt-20 w-[85%] mx-auto '>
        <div className='flex justify-center items-center md:justify-start'>
              <h3 className='bg-teal-50 border border-emerald-300 rounded-2xl px-4 py-[5px]'><span className='text-green-700 text-s font-bold'>Try it free for a week</span><span className='text-green-600 text-sm mx-2 px-2 py-[3px] bg-emerald-100 rounded-2xl'>No card required</span></h3>
        </div>
      </div>
    </div>
  )
}

export default Home
