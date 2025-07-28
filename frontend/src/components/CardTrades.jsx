import React, { useState } from 'react';

function getStatusStyle(status) {
  switch (status) {
    case 'OPEN':
      return { label: 'OPN', color: 'bg-green-800' };
    case 'CLOSED':
      return { label: 'CLD', color: 'bg-red-700' };
    case 'CANCELLED':
      return { label: 'CND', color: 'bg-orange-500' };
    default:
      return { label: status, color: 'bg-gray-500' };
  }
}

function formatDate(dateString) {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
}

function CardTrades({ trade, onUpdate , onDelete }) {
  const { label, color } = getStatusStyle(trade.status);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative p-6 rounded-2xl border border-stone-300/20 bg-gray-500/20 font-semibold shadow-lg overflow-hidden md:w-[100%] w-full mr-10 ">
      <div className="absolute -top-6 -left-6 w-34 h-44 bg-orange-500 rounded-full blur-2xl z-0" />

      <div className="relative z-10 space-y-4">
        <div className='flex items-center justify-between'>
          <div className={`w-10 h-10 ${color} text-white text-sm flex items-center justify-center rounded-full `}>
            {label}
          </div>

          <div className='flex-grow ml-4'>
            <p className="text-sm text-gray-300 mb-1 font-semibold">Pair</p>
            <p className="text-lg text-white font-semibold">{trade.paire}</p>
          </div>

          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
              <img src="/src/assets/three-point.png" alt="menu" className='h-5 w-5 cursor-pointer rotate-90' />
            </button>

            {menuOpen && (
              <div className="absolute -bottom-5 right-7 mt-20 w-32 bg-gray-500/20 border rounded shadow z-50 text-sm">
                <button onClick={() => {setMenuOpen(false); onUpdate();}} className="block w-full text-orange-500 text-center px-4 py-2 hover:scale-103 duration-300 cursor-pointer">
                  Update
                </button>
                <hr />
                <button onClick={() => {setMenuOpen(false); onDelete();}}className="block w-full text-center px-4 py-2 hover:scale-103 duration-300 text-red-600 cursor-pointer">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <hr className="h-[3px] w-full rounded border-0 bg-gradient-to-t from-[#2a2a2a] to-[#0f0f0f] shadow-inner" />


        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
          <div><p className="text-gray-200">Entry</p><p>{trade.entryPrice}</p></div>
          <div><p className="text-gray-200">Exit</p><p>{trade.exitPrice ?? '—'}</p></div>
          <div><p className="text-gray-200">Stop Loss</p><p>{trade.stopLoss}</p></div>
          <div><p className="text-gray-200">Take Profit</p><p>{trade.takeProfit}</p></div>
          <div><p className="text-gray-200">Lot Size</p><p>{trade.size_lot}</p></div>
          <div><p className="text-gray-200">Result</p><p>{trade.result ?? '—'}</p></div>
          <div><p className="text-gray-200">Risk amount</p><p>{trade.risk_amount}</p></div>
          <div><p className="text-gray-200">Status</p><p>{trade.status}</p></div>
          <div><p className="text-gray-200">Direction</p><p>{trade.direction}</p></div>
        </div>

        <hr className="h-[3px] w-full rounded border-0 bg-gradient-to-t from-[#2a2a2a] to-[#0f0f0f] shadow-inner" />

        <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 font-normal">
          <div><p>Créé le</p><p>{formatDate(trade.createdAt)}</p></div>
          <div><p>Fermé le</p><p>{formatDate(trade.closedAt)}</p></div>
        </div>
      </div>
    </div>
  );
}

export default CardTrades;
