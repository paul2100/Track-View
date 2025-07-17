import React from 'react';

function CardStatsTrades({ title, stats, icons: Icon }) {
  return (
    <div className="w-full p-5 rounded-2xl border border-rose-200 bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-rose-100 text-rose-500">
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        <div className="flex flex-col">
          <h3 className="text-xs font-medium text-gray-500">{title}</h3>
          <p className="text-l font-bold text-gray-800">{stats}</p>
        </div>
      </div>
    </div>
  );
}

export default CardStatsTrades;
