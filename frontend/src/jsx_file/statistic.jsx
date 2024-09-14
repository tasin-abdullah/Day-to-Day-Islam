import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistic = (data) => {
  const chartData = {
    labels: ['Fajar', 'Johor', 'Asor', 'Magrib', 'Esha'],
    datasets: [
      {
        label: 'Prayed',
        data: [
          data.data.fajar.prayed,
          data.data.johor.prayed,
          data.data.asor.prayed,
          data.data.magrib.prayed,
          data.data.esha.prayed,
        ],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Jamat',
        data: [
          data.data.fajar.jamat,
          data.data.johor.jamat,
          data.data.asor.jamat,
          data.data.magrib.jamat,
          data.data.esha.jamat,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Sunnah',
        data: [
          data.data.fajar.sunnah,
          data.data.johor.sunnah,
          data.data.asor.sunnah,
          data.data.magrib.sunnah,
          data.data.esha.sunnah,
        ],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Salat Performance',
      },
      legend: {
        position: 'top',
      },
    },
    responsive: true,
  };

  return <Bar data={chartData} className='bar-graph' options={options} />;
};

export default Statistic;
