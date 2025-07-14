import React from 'react'

function CardStats({title , value , img , currency}) {
  return (
    <div className='border border-stone-300 md:h-35 h-30 md:w-70 my-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between p-8'>

      <div className='flex justify-between flex-col'>
        <p className="text-base text-gray-500 py-1">{title}</p>
        <p className='text-lg font-semibold text-gray-800'> {value} <span className='text-orange-400'>{currency}</span></p>
      </div>

      <div>
        <img src={img} alt="" className='h-8 w-8 mt-1' />
      </div>

    </div>
  )
}

export default CardStats
