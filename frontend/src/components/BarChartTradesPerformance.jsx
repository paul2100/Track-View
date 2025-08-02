import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement);

function BarChartTradesPerformance({ countPaireByResult = {} }) {

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
    labels: Object.keys(countPaireByResult),
    datasets: [
      {
        label: "Total Result",
        data: Object.values(countPaireByResult),
        backgroundColor: Object.keys(countPaireByResult).map((_, index) =>
          colors[index % colors.length]
        ),
        borderRadius: 6,
        barThickness: 14,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Performance par paire",
        color: "#fff",
        align: "center",
        font: {
          size: 20,
          weight: "semibold",
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false, 
          drawTicks: false,
          display: false,          
        },
        border: {
          display: true,
          color: '#444',          
          width: 1,
        },
        ticks: {
          color: "#fff",
        },
      },
      y: {
        grid: {
          drawOnChartArea: false, 
          drawTicks: false,
          color: 'transparent',   
        },
        border: {
          display: true,
          color: '#444',           
          width: 1,                
        },
        ticks: {
          color: "#fff",
        },
      },
    },
  };

  return (
    <div className='bg-gray-200/10 border border-stone-300/30 rounded-2xl inset-shadow-stone-300/30 inset-shadow-sm shadow-md shadow-stone-300/30 h-69 w-full md:mt-0 mt-5 p-2'>
      <div className="w-full h-full">
        {countPaireByResult && Object.keys(countPaireByResult).length > 0 ? (
          <Bar data={data} options={options} width={null} height={null} className='w-full h-full'/>
        ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Aucune donnée pour cette période
        </div>
        )}
      </div>
    </div>
  );
}

export default BarChartTradesPerformance;
