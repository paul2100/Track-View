import React, { useState } from 'react';

function CardJournal({ journal, VoirPlus , onDelete , onEdit}) {
  const { trade, tradeScreenshots, createdAt } = journal;
  const screenshotUrl = tradeScreenshots[0]?.screenshotUrl;
  const [menuOpen , setMenuOpen] = useState(false);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
  });

  return (
  <div className="group relative border bg-rose-100/70 border-rose-500 rounded-3xl overflow-hidden duration-500 transition-all cursor-pointer">
      <div className='mx-3 my-4 flex justify-between items-center'>
        <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {trade.paire}
            </h2>
        </div>

          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
              <img src="/src/assets/three-point.svg" alt="menu" className='h-5 w-5 cursor-pointer' />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-50 text-sm">
                <button onClick={() => {setMenuOpen(false); onEdit(journal);}} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Update
                </button>
                <button onClick={() => {setMenuOpen(false); onDelete(journal.id);}}className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
                  Delete
                </button>
              </div>
            )}
          </div>


      </div>
      {screenshotUrl ? (
        <div className="overflow-hidden">
          <img
            src={screenshotUrl}
            alt="Screenshot"
            className="w-full h-52 object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-52 flex items-center justify-center bg-neutral-100 text-neutral-400 italic">
          Aucune image
        </div>
      )}

      
      <div className="flex justify-between items-center my-4 mx-3">
          <div>
            <p className="text-sm">{formatDate(createdAt)}</p>
          </div>

          <button onClick={() => VoirPlus(journal.id)} className="text-sm font-medium border-rose-400 cursor-pointer border px-3 py-1 rounded-xl shadow-md shadow-rose-400/90 scale-105 hover:scale-100 duration-500 transition-all">
            View more
          </button>
        </div>
      </div>

  );
}

export default CardJournal;
