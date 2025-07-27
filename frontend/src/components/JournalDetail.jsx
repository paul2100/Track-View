import React from 'react';

function JournalDetail({ journal ,  onClose  }) {
  const { trade, createdAt, tradeScreenshots } = journal;
  const beforeImage = tradeScreenshots[0]?.screenshotUrl;
  const afterImage = tradeScreenshots[1]?.screenshotUrl;
  const beforeTimeFrame = tradeScreenshots[0]?.timeframe;
  const afterTimeFrame = tradeScreenshots[1]?.timeframe;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  return (
    <div className="md:absolute md:w-[79%] mx-auto p-6 rounded-2xl bg-white border border-orange-400 text-neutral-800 shadow-lg shadow-orange-200 transition-all duration-300">
      
      <div className="w-full flex flex-col md:flex-row justify-between items-center border-b border-orange-300 pb-6 mb-8">
        <div className="w-full flex items-center gap-2 justify-between">
          <div className='md:flex'>
            <h2 className="md:text-lg font-semibold md:mr-2 md:mb-0 mb-2">Journal created at  :</h2>
            <p className="px-4 py-1 rounded-4xl border border-orange-400 text-sm text-center font-medium bg-orange-50 text-orange-600">
              {formatDate(createdAt)}
            </p>
          </div>
          
          <div>
            <button onClick={onClose} className="text-rose-500 mb-4 cursor-pointer border border-red-600 px-4 py-1 rounded-lg bg-rose-100 hover:bg-red-600 hover:text-white duration-300">
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 bg-orange-50 rounded-xl p-4 shadow-sm border border-orange-200">
          <div className="flex justify-between items-center mb-2 text-sm font-semibold text-orange-600">
            <span>Before</span>
            <span className="italic">Timeframe: {beforeTimeFrame}</span>
          </div>
          {beforeImage ? (
            <img src={beforeImage} alt="image" className="rounded-lg border-2 border-orange-400 w-full md:h-100 h-50 object-cover" />
          ) : (
            <div className="h-64 flex items-center justify-center text-orange-300 italic bg-orange-100 rounded-lg">
              Aucune image
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 bg-orange-50 rounded-xl p-4 shadow-sm border border-orange-200">
          <div className="flex justify-between items-center mb-2 text-sm font-semibold text-orange-600">
            <span>After</span>
            <span className="italic">Timeframe: {afterTimeFrame}</span>
          </div>
          {afterImage ? (
            <img src={afterImage} alt="image" className="rounded-lg border-2 border-orange-400 w-full md:h-100 h-50 object-cover" />
          ) : (
            <div className="h-64 flex items-center justify-center text-orange-300 italic bg-orange-100 rounded-lg">
              Aucune image
            </div>
          )}
        </div>
      </div>

      <div className='my-5 p-2 '>
        
        <div className='flex justify-between w-full md:flex-row flex-col'> 
          <div className='flex flex-col md:w-1/3 p-2'>
            <h2 className='font-semibold my-4 text-orange-500'>Details Trade :</h2>
              <span className='italic font-semibold text-black mb-4'>Open date Trade : <span className='text-orange-500 bg-orange-100 px-3 py-1 rounded-2xl not-italic text-sm'>{formatDate(trade.createdAt)}</span></span>
              <span className='italic font-semibold text-black mb-4'>Closed date Trade : <span className='text-orange-500 bg-orange-100 px-3 py-1 rounded-2xl not-italic text-sm'>{formatDate(trade.closedAt)}</span></span>
              <span className='italic font-semibold text-black mb-4'>Direction : <span className='text-orange-500 bg-orange-100 px-3 py-1 rounded-2xl not-italic text-sm'>{trade.direction}</span></span>
              <span className='italic font-semibold text-black mb-4'>Entry price : <span className='text-orange-500 bg-orange-100 px-3 py-1 rounded-2xl not-italic text-sm'>{trade.entryPrice}</span></span>
              <span className='italic font-semibold text-black mb-4'>Exit price : <span className='text-orange-500 bg-orange-100 px-3 py-1 rounded-2xl not-italic text-sm'>{trade.exitPrice}</span></span>
              <span className='italic font-semibold text-black mb-4'>Paire : <span className='text-orange-500 bg-orange-100 px-3 py-1 rounded-2xl not-italic text-sm'>{trade.paire}</span></span>
              <span className='italic font-semibold text-black mb-4'>Result : <span className='text-orange-500 bg-orange-100 px-3 py-1 rounded-2xl not-italic text-sm'>{trade.result}</span></span>
              <span className='italic font-semibold text-black mb-4'>Take profit : <span className='text-orange-500 bg-orange-100 px-3 py-1 rounded-2xl not-italic text-sm'>{trade.takeProfit}</span></span>
              <span className='italic font-semibold text-black mb-4'>Stop loss : <span className='text-orange-500 bg-orange-100 px-3 py-1 rounded-2xl not-italic text-sm'>{trade.stopLoss}</span></span>
          </div>

          <div className='flex flex-col md:w-1/2 p-2'>
            <h2 className='font-semibold my-4 text-orange-500'>Journal Insights :</h2>
            <span className='mb-5 border rounded p-2 bg-orange-100'><span className='italic font-bold'>Plan trade :</span> {journal.plan_trade}</span>
            <span className='mb-5 border rounded p-2 bg-orange-100'><span className='italic font-bold'>Emotions :</span> {journal.emotions}</span>
            <span className='mb-5 border rounded p-2 bg-orange-100'><span className='italic font-bold'>Indicators :</span> {journal.indicators}</span>
            <span className='mb-5 border rounded p-2 bg-orange-100'><span className='italic font-bold'>Post analysis :</span> {journal.post_trade_analysis}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JournalDetail;
