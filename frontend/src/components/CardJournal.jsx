import React from 'react';

function CardJournal({ journal, VoirPlus , onDelete}) {
  const { trade, tradeScreenshots, createdAt } = journal;
  const screenshotUrl = tradeScreenshots[0]?.screenshotUrl;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
  });

  return (
  <div className="group relative bg-gradient-to-br from-[#DC7741] via-[#252528] to-[#151517] border-[1px] border-orange-500 rounded-3xl overflow-hidden duration-500 transition-all cursor-pointer">
      <div className='mx-3 my-4 flex justify-between items-center'>
        <div>
            <h2 className="text-xl font-semibold text-slate-100 tracking-tight">
              {trade.paire}
            </h2>
        </div>

        <div>
          <button className='px-4 py-1 rounded-4xl mx-1 bg-orange-500 text-white shadow-sm shadow-stone-400/50 hover:shadow-orange-500/70 hover:scale-102 duration-300 cursor-pointer'>Edit</button>
          <button onClick={() => onDelete(journal.id)} className='px-4 py-1 rounded-4xl mx-1 bg-red-500 text-white shadow-sm shadow-stone-400/50 hover:shadow-red-500/70 hover:scale-102 duration-300 cursor-pointer'>Delete</button>
        </div>


      </div>
      {screenshotUrl ? (
        <div className="overflow-hidden">
          <img
            src={screenshotUrl}
            alt="Screenshot"
            className="w-full h-52 "
          />
        </div>
      ) : (
        <div className="w-full h-52 flex items-center justify-center bg-neutral-100 text-neutral-400 italic">
          Aucune image
        </div>
      )}

      
      <div className="flex justify-between items-center my-4 mx-3">
          <div>
            <p className="text-sm text-slate-300">{formatDate(createdAt)}</p>
          </div>

          <button onClick={() => VoirPlus(journal.id)} className="text-sm font-medium text-white border-orange-400 cursor-pointer border px-3 py-1 rounded-xl shadow-md shadow-orange-400/40 hover:scale-105 duration-500 transition-all">
            View more
          </button>
        </div>
      </div>

  );
}

export default CardJournal;
