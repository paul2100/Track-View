import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function PnlChart({ data }) {
  const hasData = data && data.length > 0;

  const labels = hasData ? data.map(item => item.date) : [];
  const pnlValues = hasData ? data.map(item => item.pnl) : [];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'PNL',
        data: pnlValues,
        backgroundColor: pnlValues.map(val => (val >= 0 ? 'orange' : 'red')),
        borderRadius: 4,
        barThickness: 14,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'PNL net',
        color: 'black',
        font: {
          size: 12,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        titleColor: 'black',
        bodyColor: 'black',
        backgroundColor: 'white',
      },
    },
    scales: {
      x: {
        ticks: { color: 'black' },
      },
      y: {
        beginAtZero: true,
        ticks: { color: 'black' },
      },
    },
  };

  return (
    <div className="md:w-[49%] w-full h-[340px] flex justify-center items-center border shadow-sm hover:shadow-md transition-shadow duration-200 border-stone-300 rounded-lg mt-5 md:mt-0">
        <div className="w-full h-full p-4">
          <Bar data={chartData} options={options} />
        </div>
    </div>
  );
}

export default PnlChart;
