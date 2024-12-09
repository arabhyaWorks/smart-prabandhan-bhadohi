import React from 'react';
import classNames from 'classnames';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: { title: string; description: string }[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between relative">
        {/* Progress bar */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full bg-orange-600 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative flex flex-col items-center group"
            style={{ width: '120px' }}
          >
            <div
              className={classNames(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                "border-2 z-10",
                {
                  'bg-orange-600 border-orange-600': index + 1 <= currentStep,
                  'bg-white border-gray-300': index + 1 > currentStep
                }
              )}
            >
              {index + 1 < currentStep ? (
                <Check className="w-6 h-6 text-white" />
              ) : (
                <span className={index + 1 <= currentStep ? 'text-white' : 'text-gray-500'}>
                  {index + 1}
                </span>
              )}
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 text-center">
              <p className={classNames(
                "text-sm font-medium transition-colors duration-300",
                index + 1 <= currentStep ? 'text-orange-600' : 'text-gray-500'
              )}>
                {step.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;