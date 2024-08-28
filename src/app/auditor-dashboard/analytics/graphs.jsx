"use client";

import clsx from "clsx";
import { useState } from "react";
import { RiDraggable } from "react-icons/ri";
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
  Filler
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
  Title,
  Filler
);

// Doughnut Chart Component
export default function DoughnutChart() {
  const data = {
    labels: ['Completed', 'Not-completed'],
    datasets: [
      {
        data: [50, 100],
        backgroundColor: ["#F9A22B", '#DCDCDC'],
        hoverBackgroundColor: ['#FDF5E9', '#EDEDED'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        borderRadius: 50,
      },
      title: {
        display: false,
        text: 'Doughnut Chart',
      },
    },
    cutout: '80%', // Size of the hole in the center
  };

  return <div className='border border-gray-200 shadow-xl rounded-md p-4 h-[21rem]'>
    <div className='flex flex-row justify-between px-2 items-center'>
      <div>
        <h3 className='font-medium text-lg'>Total registered learners </h3>
        <p className='font-normal text-sm text-tgrey3'>Learners that completed course Bar Chart</p>
      </div>
      <div>
        <RiDraggable className="w-6 h-6" />
      </div>
    </div>
    <div className=' flex flex-row items-center  justify-center h-[17rem] px-6 py-4'>
      <Doughnut data={data} options={options} />
    </div>
  </div>

};

// Line Graph Component
export function LineGraph() {
  const data = {
    labels: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    datasets: [
      {
        // label: 'Sales 2023',
        data: [0, 1.5, 2, 3, 1, 2, 5, 5, 3, 8],
        fill: 'start',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(249, 162, 43, 0.2)');
          gradient.addColorStop(1, 'rgba(249, 162, 43, 0.02)');
          return gradient;
        },
        borderColor: '#F9A22B',
        borderWidth: 1,
        tension: 0.5,
        pointStyle: 'dash',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: false,
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
        grid: {
          display: false,  // This removes horizontal grid lines
        },
      },
      x: {
        title: {
          display: true,
          // text: 'Month',
        },
        grid: {
          display: false,  // This removes horizontal grid lines
        },
      },
    },
  };

  return <div className='border border-gray-200 shadow-xl rounded-md p-4 '>
    <div className='flex flex-row justify-between px-2 items-center'>
      <div>
        <h3 className='font-medium text-lg'>Total  number of registered learners</h3>
        <p className='font-normal text-sm text-tgrey3'>Registered learners in last 10 days</p>
      </div>
      <div>
        <RiDraggable className="w-6 h-6" />
      </div>
    </div>
    <div className='text-center justify-center flex py-2 h-[16rem]' >
      <Line data={data} options={options} />
    </div>

  </div>;
};

// STP Graph 
export function STPGraph() {
  const data = {
    labels: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    datasets: [
      {
        // label: 'Sales 2023',
        data: [0, 1.5, 2, 3, 1, 6, 2, 1, 5, 5, 3, 8],
        fill: 'start',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(249, 162, 43, 0.2)');
          gradient.addColorStop(1, 'rgba(249, 162, 43, 0.02)');
          return gradient;
        },
        borderColor: '#F9A22B',
        borderWidth: 1,
        tension: 0.5,
        pointStyle: 'dash',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: false,
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
        grid: {
          display: false,
        },
      },
      x: {
        title: {
          display: true,
          // text: 'Month',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <div className='text-center justify-center flex py-2 h-[15rem]' >
    <Line data={data} options={options} />
  </div>
}

// FTS Graph 
export function FTSGraph() {
  const data = {
    labels: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    datasets: [
      {
        // label: 'Sales 2023',
        data: [0, 1.5, 2, 3, 1, 6, 2, 1, 5, 5, 3, 8],
        fill: 'start',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(249, 162, 43, 0.2)');
          gradient.addColorStop(1, 'rgba(249, 162, 43, 0.02)');
          return gradient;
        },
        borderColor: '#F9A22B',
        borderWidth: 1,
        tension: 0.5,
        pointStyle: 'dash',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: false,
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
        grid: {
          display: false,
        },
      },
      x: {
        title: {
          display: true,
          // text: 'Month',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <div className='text-center justify-center flex py-2 h-[15rem]' >
    <Line data={data} options={options} />
  </div>
}

// PAE Graph 
export function PAEGraph() {
  const data = {
    labels: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    datasets: [
      {
        // label: 'Sales 2023',
        data: [0, 1.5, 2, 3, 1, 6, 2, 1, 5, 5, 3, 8],
        fill: 'start',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(249, 162, 43, 0.2)');
          gradient.addColorStop(1, 'rgba(249, 162, 43, 0.02)');
          return gradient;
        },
        borderColor: '#F9A22B',
        borderWidth: 1,
        tension: 0.5,
        pointStyle: 'dash',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: false,
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
        grid: {
          display: false,
        },
      },
      x: {
        title: {
          display: true,
          // text: 'Month',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <div className='text-center justify-center flex py-2 h-[15rem]' >
    <Line data={data} options={options} />
  </div>
}

// GRE Graph 
export function GREGraph() {
  const data = {
    labels: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    datasets: [
      {
        // label: 'Sales 2023',
        data: [0, 1.5, 2, 3, 1, 6, 2, 1, 5, 5, 3, 8],
        fill: 'start',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(249, 162, 43, 0.2)');
          gradient.addColorStop(1, 'rgba(249, 162, 43, 0.02)');
          return gradient;
        },
        borderColor: '#F9A22B',
        borderWidth: 1,
        tension: 0.5,
        pointStyle: 'dash',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: false,
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
        grid: {
          display: false,
        },
      },
      x: {
        title: {
          display: true,
          // text: 'Month',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <div className='text-center justify-center flex py-2 h-[15rem]' >
    <Line data={data} options={options} />
  </div>
}

export function FundingGraphs() {
  const [activeSection, setActiveSection] = useState("STPGraph");

  const onSTPClick = () => {
    setActiveSection("STPGraph")
  }

  const onFTSClick = () => {
    setActiveSection("FTSGraph")
  }

  const onPAEClick = () => {
    setActiveSection("PAEGraph")
  }

  const onGREClick = () => {
    setActiveSection("GREGraph")
  }


  const renderActiveSection = () => {
    switch (activeSection) {
      case "STPGraph":
      default:
        return (
          <STPGraph />
        );
      case "FTSGraph":
        return <FTSGraph />
      case "PAEGraph":
        return <PAEGraph />
      case "GREGraph":
        return <GREGraph />
    }
  };


  return (
    <div className="flex flex-row p-4 space-x-4">
      <div className="text-tgrey3 font-medium text-sm space-y-4 w-[15%]">
        {/* STP Funding body */}
        <h2
          className={clsx(
            "cursor-pointer py-2 pl-2 rounded",
            {
              "bg-tgrey4": activeSection === "STPGraph",
              "bg-white": activeSection !== "STPGraph",
            }
          )}
          onClick={onSTPClick}
        >
          STP Funding body
        </h2>
        {/* FTS Funding body */}
        <h2
          className={clsx(
            "flex flex-row cursor-pointer py-2 pl-2 rounded",
            {
              "bg-tgrey4": activeSection === "FTSGraph",
              "bg-white": activeSection !== "FTSGraph",
            }
          )}
          onClick={onFTSClick}
        >
          FTS Funding body
        </h2>
        {/* Password */}
        <h2
          className={clsx(
            "flex flex-row cursor-pointer py-2 pl-2 rounded",
            {
              "bg-tgrey4": activeSection === "PAEGraph",
              "bg-white": activeSection !== "PAEGraph",
            }
          )}
          onClick={onPAEClick}
        >
          PAE Funding body
        </h2>
        {/* GRE Funding body */}
        <h2
          className={clsx(
            "flex flex-row cursor-pointer py-2 pl-2 rounded",
            {
              "bg-tgrey4": activeSection === "GREGraph",
              "bg-white": activeSection !== "GREGraph",
            }
          )}
          onClick={onGREClick}
        >
          GRE Funding body
        </h2>
      </div>
      <div className="flex flex-col pl-4 mr-0 w-[85%]">
        {renderActiveSection()}
      </div>
    </div>
  )
}


