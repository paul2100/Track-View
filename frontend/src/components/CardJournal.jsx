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
  <div className="group relative border bg-gray-500/20 border-stone-300/20 rounded-3xl overflow-hidden duration-500 transition-all cursor-pointer">
      <div className='mx-3 my-4 flex justify-between items-center'>
        <div>
            <h2 className="text-xl text-white font-semibold tracking-tight">
              {trade.paire}
            </h2>
        </div>

          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
              <img src="/src/assets/three-point.png" alt="menu" className='h-5 w-5 cursor-pointer rotate-90' />
            </button>

            {menuOpen && (
              <div className="absolute -bottom-3 right-7 w-32 bg-gray-500/30 border rounded shadow z-50 text-sm">
                <button onClick={() => {setMenuOpen(false); onEdit(journal);}} className="block w-full text-center text-orange-500 px-4 py-[3px] hover:bg-gray-500/30 duration-300 cursor-pointer">
                  Update
                </button>
                <hr />
                <button onClick={() => {setMenuOpen(false); onDelete(journal.id);}}className="block w-full text-center px-4 py-[3px] hover:bg-gray-500/30 text-red-600 duration-300 cursor-pointer">
                  Delete
                </button>
              </div>
            )}
          </div>


      </div>
      {screenshotUrl ? (
      <div className="overflow-hidden" style={{ boxShadow: '0 -4px 20px rgba(249, 115, 22, 0.5), 0 4px 20px rgba(249, 115, 22, 0.5)' }}>       <img
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
            <p className="text-sm text-gray-200">{formatDate(createdAt)}</p>
          </div>

          <button onClick={() => VoirPlus(journal.id)} className="text-sm font-medium text-gray-200 border-orange-400 cursor-pointer border px-3 py-1 rounded-xl shadow-sm shadow-orange-500/90 hover:scale-103 duration-500 transition-all">
            View more
          </button>
        </div>
      </div>

  );
}

export default CardJournal;
