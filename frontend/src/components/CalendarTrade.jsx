import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  addMonths,
  subMonths,
  isSameDay,
} from "date-fns";
import fr from "date-fns/locale/fr";

function CalendarTrade({ groupeTrades = {} }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);

  const rows = [];
  let days = [];
  let day = monthStart;

  while (day <= monthEnd) {
    for (let i = 0; i < 7; i++) {
      if (day > monthEnd) break;

      const dateStr = format(day, "dd/MM/yyyy", { locale: fr });
      const tradeData = groupeTrades[dateStr];

      days.push(
        <div
          key={day}
          className={`h-13 sm:h-20 p-1 sm:p-2 flex flex-col rounded-lg transition border 
            ${isSameDay(day, new Date()) ? "shadow-sm shadow-orange-500 bg-orange-200" : "border-gray-200 bg-white/90"} 
            hover:shadow hover:scale-105 text-[10px] sm:text-sm`}
        >
          <span className="font-semibold text-gray-700">
            {format(day, "d")}
          </span>

          {tradeData ? (
            <div className="mt-auto space-y-0.5 sm:space-y-1">
              <p
                className={`text-[8px] sm:text-[10px] font-bold ${
                  tradeData.sum >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {tradeData.sum}€
              </p>
              <p className="text-[9px] sm:text-[11px] text-gray-500">{tradeData.count} trades</p>
            </div>
          ) : (
            <div className="mt-auto text-[9px] sm:text-[11px] text-gray-500 italic">
              No trade
            </div>
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(<div className="grid grid-cols-7 gap-1 sm:gap-2" key={day}>{days}</div>);
    days = [];
  }

  return (
    <div className="w-full sm:max-w-3xl bg-gray-200/10 rounded-2xl shadow-stone-300/30 shadow-md border-stone-300/30 p-3 sm:p-6 border overflow-x-auto">
      <div className="flex justify-between items-center mb-4 sm:mb-6 text-xs sm:text-base">
        <button 
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} 
          className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer duration-300 hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-lg sm:text-2xl font-bold text-white capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: fr })}
        </h2>

        <button 
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} 
          className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer duration-300 hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 text-center font-semibold text-gray-200 mb-2 text-[6px] sm:text-sm">
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div className="text-orange-500">Saturday</div>
        <div className="text-orange-500">Sunday</div>
      </div>

      <div className="space-y-1 sm:space-y-2">{rows}</div>
    </div>
  );
}

export default CalendarTrade;
