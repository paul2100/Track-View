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
  plugins,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement);

function BarChartHorizontalAverageTime({ AverageTimeLossAndWinTrade = {} }) {

const parseTimeToHours = (timeStr) => {
if (!timeStr) return 0;
const [hoursPart, minutesPart] = timeStr.split(" ");
const hours = parseInt(hoursPart.replace("h", "")) || 0;
const minutes = parseInt(minutesPart.replace("m", "")) || 0;
return hours + minutes / 60;
};

const avgWin = parseTimeToHours(AverageTimeLossAndWinTrade.avgWin);
const avgLoss = parseTimeToHours(AverageTimeLossAndWinTrade.avgLoss);


const data = {
    labels: ['AvgWin' , 'AvgLoss'],
    datasets: [
        {
            data: [avgWin , avgLoss],
            backgroundColor: ['#4CAF50', '#F44336'],
            barThickness: 14,
        }
    ]
}

const options = {
    plugins: {
        title:{
            display: true,
            text: 'Average Win and Loss in ( Hours )',
            color: '#fff',
            align: 'center',
            font: {
                size: 20,
                weight: 'semibold',
            },
        },
        legend: {
            display: false,
        },
    },
    indexAxis: 'y',
    scales: {
        x: { 
            beginAtZero: true,
            ticks: {color: '#fff'},
            grid: {color: 'rgba(255, 255 , 255 , 0.1)'},
        },
        y: {
            ticks: {color: '#fff'},
            grid: {color: 'rgba(255, 255 , 255 , 0.1)'},
        }

    }
}





  return (
    <div className='bg-gray-200/10 border border-stone-300/30 rounded-2xl inset-shadow-stone-300/30 inset-shadow-sm shadow-md shadow-stone-300/30 h-80 w-143 md:mt-0 mt-5'>
      <div className="w-full h-full flex justify-center items-center">
        {AverageTimeLossAndWinTrade && Object.keys(AverageTimeLossAndWinTrade).length > 0 && (avgWin > 0 || avgLoss > 0)? (
          <Bar data={data} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Aucune donnée pour cette période
          </div>
        )}
      </div>
    </div>
  );
}

export default BarChartHorizontalAverageTime
