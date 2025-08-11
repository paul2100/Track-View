import React from 'react'

function CardAccountDetails({title , value , img , currency}) {
  return (
    <div className='bg-gray-400/10 border border-orange-400/50 md:h-35 h-30 md:w-70 my-2 rounded-lg shadow-md shadow-orange-500 duration-200 flex justify-between p-8 mx-2 hover:scale-103 duration-300'>

      <div className='flex justify-between flex-col'>
        <p className="text-base font-semibold text-gray-200 py-1">{title}</p>
        <p className='text-lg text-gray-300'> {value} <span className='text-orange-400'>{currency}</span></p>
      </div>

      <div>
        <img src={img} alt="" className='h-8 w-8 mt-1' />
      </div>

    </div>
  )
}

export default CardAccountDetails