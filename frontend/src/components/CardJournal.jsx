import React from 'react';

function CardJournal({ journal }) {
  const { trade, tradeScreenshots, createdAt } = journal;
  const screenshotUrl = tradeScreenshots[0]?.screenshotUrl;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {screenshotUrl && (
        <img
          src={screenshotUrl}
          alt="Screenshot"
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4 space-y-2">
        <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
        <p className="text-lg font-semibold text-gray-800">{trade.paire}</p>
        <p className="text-sm text-gray-600">{trade.status}</p>

        <button className="mt-3 bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 text-sm">
          Voir plus
        </button>
      </div>
    </div>
  );
}

export default CardJournal;
