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
    <div className="relative p-6 rounded-2xl border border-orange-400/30 bg-white text-black font-semibold shadow-lg overflow-hidden md:w-[100%] w-full mr-10">
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-500 opacity-50 rounded-full blur-2xl z-0" />

      <div className="relative z-10 space-y-4">
        <div className='flex items-center justify-between'>
          <div className={`w-10 h-10 ${color} text-white text-sm flex items-center justify-center rounded-full`}>
            {label}
          </div>

          <div className='flex-grow ml-4'>
            <p className="text-sm text-black mb-1 font-semibold">Pair</p>
            <p className="text-lg text-gray-600 font-semibold">{trade.paire}</p>
          </div>

          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
              <img src="/src/assets/three-point.svg" alt="menu" className='h-5 w-5 cursor-pointer' />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-50 text-sm">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onUpdate();
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete();
                    
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <hr />

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div><p className="text-gray-500">Entry</p><p>{trade.entryPrice}</p></div>
          <div><p className="text-gray-500">Exit</p><p>{trade.exitPrice ?? '—'}</p></div>
          <div><p className="text-gray-500">Stop Loss</p><p>{trade.stopLoss}</p></div>
          <div><p className="text-gray-500">Take Profit</p><p>{trade.takeProfit}</p></div>
          <div><p className="text-gray-500">Lot Size</p><p>{trade.size_lot}</p></div>
          <div><p className="text-gray-500">Result</p><p>{trade.result ?? '—'}</p></div>
          <div><p className="text-gray-500">Risk amount</p><p>{trade.risk_amount}</p></div>
          <div><p className="text-gray-500">Status</p><p>{trade.status}</p></div>
          <div><p className="text-gray-500">Direction</p><p>{trade.direction}</p></div>
        </div>

        <hr />

        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 font-normal">
          <div><p>Créé le</p><p>{formatDate(trade.createdAt)}</p></div>
          <div><p>Fermé le</p><p>{formatDate(trade.closedAt)}</p></div>
        </div>
      </div>
    </div>
  );
}

export default CardTrades;
