import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChartDrawdown({ DrawdownInPourcent = [] }) {

  const hasData = Array.isArray(DrawdownInPourcent) && DrawdownInPourcent.length > 0;

  const data = {
    labels: hasData ? DrawdownInPourcent.map(item => new Date(item.date).toLocaleDateString()) : [],
    datasets: [
      {
        label: 'Drawdown (%)',
        data: hasData ? DrawdownInPourcent.map(item => item.drawdown) : [],
        borderColor: '#F44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#F44336',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Drawdown evolution in %',
        color: '#fff',
        font: { size: 20, weight: 'semibold' },
      },
      legend: {
        labels: { color: '#fff' },
      },
    },
    scales: {
      x: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  return (
    <div className="bg-gray-200/10 border border-stone-300/30 rounded-2xl inset-shadow-stone-300/30 inset-shadow-sm shadow-md shadow-stone-300/30 md:h-120 h-auto w-full md:mt-0 mt-5">
      <div className="w-full h-full flex justify-center items-center p-4">
        {hasData ? (
          <Line data={data} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Aucune donnée pour cette période
          </div>
        )}
      </div>
    </div>
  );
}

export default LineChartDrawdown;
