import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutLongShort({ TotalLongShortTrade = {} }) {
  const data = {
    labels: ['Long', 'Short'],
    datasets: [
      {
        data: [TotalLongShortTrade.LONG || 0, TotalLongShortTrade.SHORT || 0],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Total long and short",
        color: "#fff",
        align: "center",
        font: {
          size: 20,
          weight: "semibold",
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          color: "#fff",
          boxWidth: 20,
          padding: 20,
        },
      },
    },
    circumference: 180,
    rotation: 270,
    aspectRatio: 2,

  };

  return (
    <div className='bg-gray-200/10 border border-stone-300/30 rounded-2xl inset-shadow-stone-300/30 inset-shadow-sm shadow-md shadow-stone-300/30 h-80 w-143 md:mt-0 mt-5'>
      <div className="w-full h-full flex justify-center items-center">
        {TotalLongShortTrade && Object.keys(TotalLongShortTrade).length > 0 && (TotalLongShortTrade.LONG > 0 || TotalLongShortTrade.SHORT > 0)? (
          <Doughnut data={data} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Aucune donnée pour cette période
          </div>
        )}
      </div>
    </div>
  );
}

export default DonutLongShort;
