import React from 'react';

function JournalDetail(props) {
  const journal = props.journal;
  const trade = journal.trade;
  const createdAt = journal.createdAt;
  const beforeImage = journal.tradeScreenshots[0]?.screenshotUrl
  const afterImage = journal.tradeScreenshots[1]?.screenshotUrl
  const beforeTimeFrame = journal.tradeScreenshots[0]?.timeframe
  const afterTimeFrame = journal.tradeScreenshots[1]?.timeframe


  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="md:absolute md:w-[79%] mx-auto p-6 rounded-xl bg-zinc-700/20 border border-stone-300/40 text-white shadow-lg">
      <div className="w-[90%] flex md:justify-between md:flex-row flex-col justify-start border-b border-zinc-300 pb-6 mb-6 mx-auto">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Pair</h2>
          <p className="text-orange-500 border px-4 py-1 rounded-4xl font-bold shadow-sm shadow-orange-500/70">{trade.paire}</p>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">PNL</h2>
          <p className={`${trade.result >= 0 ? 'text-green-400' : 'text-red-500'} border px-4 py-1 rounded-4xl font-bold shadow-sm shadow-red-500/70 md:w-full`}>
            {trade.result}
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Date</h2>
          <p className='border px-4 py-1 rounded-4xl font-bold shadow-sm shadow-white/70'>{formatDate(createdAt)}</p>
        </div>
      </div>

      <div className="w-full ">
        <div className='w-[90%] mx-auto my-4 text-lg font-semibold flex justify-between'>
          <h3>Timeframe : {beforeTimeFrame}</h3>          
          <h3>Before</h3>
        </div>
        {beforeImage ? (
          <div className="overflow-hidden flex justify-center">
            <img
              src={beforeImage}
              alt="Screenshot"
              className="w-[90%] h-full rounded-lg border-orange-400 border-2"
            />
          </div>
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-zinc-700 text-zinc-400 italic rounded-lg">
            Aucune image
          </div>
        )}
      </div>

      <div className='w-[90%] mx-auto my-6 pt-6 border-t border-zinc-300 text-lg font-semibold flex justify-between'>
        <h3>Timeframe : {afterTimeFrame}</h3>
        <h3>After</h3>
      </div>


      {afterImage ? (
          <div className="overflow-hidden flex justify-center">
            <img
              src={afterImage}
              alt="Screenshot"
              className="w-[90%] h-full rounded-lg border-orange-400 border-2"
            />
          </div>
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-zinc-700 text-zinc-400 italic rounded-lg">
            Aucune image
          </div>
        )}
      


    </div>
  );
}

export default JournalDetail;
