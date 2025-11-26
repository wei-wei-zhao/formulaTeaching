import React, { useState, useMemo } from 'react';
import { Formula } from '../types';

interface FormulaListProps {
  formulas: Formula[];
  currentFormulaId: string;
  onSelectFormula: (formula: Formula) => void;
}

const FormulaList: React.FC<FormulaListProps> = ({ formulas, currentFormulaId, onSelectFormula }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFormulas = useMemo(() => {
    if (!searchQuery.trim()) return formulas;
    const lowerQuery = searchQuery.toLowerCase();
    return formulas.filter(f => 
      f.name.toLowerCase().includes(lowerQuery) || 
      f.description.toLowerCase().includes(lowerQuery) ||
      f.category.toLowerCase().includes(lowerQuery)
    );
  }, [formulas, searchQuery]);

  // Group by category based on filtered results
  const categories = Array.from(new Set(filteredFormulas.map(f => f.category)));

  return (
    <div className="h-full flex flex-col bg-white border-r border-slate-200">
      <div className="p-4 border-b border-slate-100 bg-slate-50 shrink-0">
        <h2 className="text-lg font-bold text-slate-800">公式库</h2>
        <p className="text-xs text-slate-500 mt-1 mb-3">选择一个函数进行探索</p>
        
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="搜索公式..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-slate-400"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-6">
        {filteredFormulas.length === 0 ? (
           <div className="text-center py-10 text-slate-400 text-sm">
             没有找到相关公式
           </div>
        ) : (
          categories.map(category => (
            <div key={category}>
              <h3 className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-2">
                {category}
              </h3>
              <div className="space-y-1">
                {filteredFormulas.filter(f => f.category === category).map(formula => (
                  <button
                    key={formula.id}
                    onClick={() => onSelectFormula(formula)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 flex flex-col ${
                      currentFormulaId === formula.id
                        ? 'bg-primary text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-medium">{formula.name}</span>
                    <span className={`text-xs mt-1 font-mono ${
                      currentFormulaId === formula.id ? 'text-indigo-200' : 'text-slate-400'
                    }`}>
                      {formula.displayLatex}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FormulaList;