import React from 'react';

function CapitalChart({ data }) {
  const hasData = data && data.length > 0;

  return (
    <div className='md:w-[49%] w-full h-[340px] flex justify-center items-center border shadow-sm hover:shadow-md transition-shadow duration-200 border-stone-300 rounded-lg mt-5 md:mt-0'>
      {hasData ? (
        
        <div className="w-full h-full">
          
          <p>Graphique à venir...</p>
        </div>
      ) : (
        <div className="text-center flex justify-center flex-col items-center text-gray-500">
          <div className='w-15 h-15 flex justify-center items-center rounded-4xl bg-rose-100'>
              <img src="/src/assets/image.svg" alt="empty" className="mx-auto w-6 h-6 opacity-50" />
          </div>
          <p className="font-medium">No data yet</p>
        </div>
      )}
    </div>
  );
}

export default CapitalChart;
