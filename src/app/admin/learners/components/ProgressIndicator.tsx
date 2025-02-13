import React from 'react';
import { FaCheck } from 'react-icons/fa';

const ProgressStepper = ({data}) => {

  // Calculate progress percentage
  const completedSteps = data.filter(step => step.status === 'completed').length + 1;
  const progressPercentage = (completedSteps / (data.length - 1)) * 80;

  return (
    <div className="w-3/4 mx-3 py-4">
      <div className="relative flex justify-between">
        {/* Progress Bar Background */}
        <div className="absolute mx-2 top-3 left-0 right-8 h-0.5 bg-gray-200" />
        
        {/* Progress Bar Fill */}
        <div 
          className="absolute mx-2 top-3 left-0 h-0.5 bg-dashboardButtons transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
        
        {/* Steps */}
        {data.map((step, index) => (
          <div key={step.id} className="relative flex flex-col ">
            {/* Circle */}
            <div 
              className={`w-6 h-6 mx-2 rounded-full border-2 flex items-center justify-center z-10 
                ${step.status === 'completed' ? 'bg-dashboardButtons border-dashboardButtons' : 
                  step.status === 'current' ? 'bg-white border-dashboardButtons' : 
                  'bg-white border-gray-300'}
                transition-colors duration-300`}
            >
              {step.status === 'completed' && (
                <span className="text-white text-lg"><FaCheck className='w-2 h-2'/></span>
              )}
              {step.status === 'current' && (
                <div className="w-2 h-2 rounded-full bg-dashboardButtons" />
              )}
            </div>
            
            {/* Label */}
            <span className={`mt-3 text-xs 
              ${step.status === 'completed' || step.status === 'current' ? 
                'text-gray-900' : 'text-gray-500'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper;