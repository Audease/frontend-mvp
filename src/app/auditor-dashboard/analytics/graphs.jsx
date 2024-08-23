"use client";

import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';

// Register required components for ChartJS
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

// Doughnut Chart Component
export default function DoughnutChart() {
  const data = {
    // labels: ['Blue', 'Yellow'],
    datasets: [
      {
        data: [50, 100],
        backgroundColor: ["#F9A22B", '#DCDCDC'],
        hoverBackgroundColor: ['#FDF5E9', '#EDEDED'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Doughnut Chart',
      },
    },
    cutout: '80%', // Size of the hole in the center
  };

  return <div className='border border-gray-200 shadow-xl rounded-md p-8'>
    <div className='px-6'>
      <h3 className='font-medium text-lg'>Total  number of registered learners</h3>
      <p className='font-normal text-sm text-tgrey3'>Registered learners in last 10 days</p>
    </div>
    <div className=' flex flex-row items-center  justify-center '>
      <Doughnut data={data} options={options} />
    </div>
  </div>

};

// Line Graph Component
export function LineGraph() {
  const data = {
    labels: [19,20,21,22,23,24,25,26,27,28],
    datasets: [
      {
        // label: 'Sales 2023',
        data: [0, 1.5, 2, 3, 1, 6, 2, 1, 5 ],
        fill: false,
        borderColor: '#F9A22B',
        backgroundColor: '#F9A22B',
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Monthly Sales Comparison',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          // text: 'Sales ($)',
        },
      },
      x: {
        title: {
          display: true,
          // text: 'Month',
        },
      },
    },
  };

  return <div className='border border-gray-200 shadow-xl rounded-md p-4'>
    <div className='px-6'>
      <h3 className='font-medium text-lg'>Total  number of registered learners</h3>
      <p className='font-normal text-sm text-tgrey3'>Registered learners in last 10 days</p>
    </div>

    <Line data={data} options={options} />
  </div>;
};


