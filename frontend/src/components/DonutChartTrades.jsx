import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


function DonutChartTrades({ countPaireByPaire = {} }) {

  const colors = [
    "#f97316", 
    "#3b82f6",
    "#10b981", 
    "#eab308", 
    "#8b5cf6",
    "#ef4444", 
    "#14b8a6", 
    "#d946ef", 
  ];

  const data = {
    labels: Object.keys(countPaireByPaire),
    datasets: [
      {
        label: "Total trade",
        data: Object.values(countPaireByPaire),
        backgroundColor: Object.keys(countPaireByPaire).map((_, index) =>
          colors[index % colors.length]
        ),
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Performance par paire",
        color: "#fff",
        align:"center",
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
  };

  return (
  <div className='bg-gray-200/10 border border-stone-300/30 rounded-2xl inset-shadow-stone-300/30 inset-shadow-sm shadow-md shadow-stone-300/30 h-69 w-full md:mt-0 mt-5'>
    <div className="w-full h-full flex justify-center">
      {countPaireByPaire && Object.keys(countPaireByPaire).length > 0 ? (
        <Doughnut data={data} options={options}/>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Aucune donnée pour cette période
        </div>
      )}
    </div>
  </div>
);
}

export default DonutChartTrades;
