import React from 'react';
import { Formula, Parameter } from '../types';

interface ParameterControlsProps {
  formula: Formula;
  onUpdateParam: (paramName: string, newValue: number) => void;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({ formula, onUpdateParam }) => {
  return (
    <div className="p-6 bg-white border-t border-slate-200 h-1/3 overflow-y-auto">
      <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        参数控制
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formula.params.map((param: Parameter) => (
          <div key={param.name} className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-700 font-mono bg-slate-100 px-2 py-0.5 rounded">
                {param.name}
              </label>
              <span className="text-xs text-slate-500">{param.description}</span>
              <span className="text-sm font-bold text-primary w-12 text-right">{param.value.toFixed(1)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
               <span className="text-xs text-slate-400 w-6 text-right">{param.min}</span>
               <input
                type="range"
                min={param.min}
                max={param.max}
                step={param.step}
                value={param.value}
                onChange={(e) => onUpdateParam(param.name, parseFloat(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
               <span className="text-xs text-slate-400 w-6">{param.max}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
          <p className="text-sm text-indigo-800">
              <span className="font-bold">简介：</span> {formula.description}
          </p>
      </div>
    </div>
  );
};

export default ParameterControls;