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

function CapitalChart({ data }) {
  const hasData = data && data.length > 0;

  const labels = hasData
    ? data.map(item =>
        new Date(item.createdAt).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
        })
      )
    : [];

  const capitalValues = hasData ? data.map(item => Number(item.capital)) : [];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Capital',
        data: capitalValues,
        fill: false,
        borderColor: 'orange',
        backgroundColor: 'orange',
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
      display: true,
      text: 'Evolution of capital',
      color: 'black',
      font: {
        size: 12,
        weight: 'bold',
      },
      padding: {
        top: 5,
        bottom: 10,
      },
    },
      legend: {
        display: false,
        labels: {
          color: 'white',
        },
      },
      tooltip: {
        titleColor: 'black',
        bodyColor: 'gray',
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
    <div className="md:w-[49%] w-full h-[340px] flex justify-center items-center border shadow-sm hover:shadow-md transition-shadow duration-200 border-stone-300 rounded-lg mt-5 md:mt-0 ">
      {hasData ? (
        <div className="w-full h-full p-4">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <div className="text-center flex justify-center flex-col items-center text-gray-500">
          <div className='w-15 h-15 flex justify-center items-center rounded-4xl bg-rose-100'>
              <img src="/src/assets/image.svg" alt="empty" className="mx-auto w-6 h-6 opacity-50" />
          </div>
          <p className="font-medium">No data yet</p>
        </div>
      )}
    </div>
  );
}

export default CapitalChart;
