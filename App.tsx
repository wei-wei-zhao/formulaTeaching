import React, { useState } from 'react';
import FormulaList from './components/FormulaList';
import GraphViewer from './components/GraphViewer';
import ParameterControls from './components/ParameterControls';
import AIChat from './components/AIChat';
import { FORMULAS, X_MIN_DEFAULT, X_MAX_DEFAULT } from './constants';
import { Formula } from './types';

const App: React.FC = () => {
  const [formulas, setFormulas] = useState<Formula[]>(FORMULAS);
  const [currentFormula, setCurrentFormula] = useState<Formula>(FORMULAS[0]); // Default to first formula
  const [xMin, setXMin] = useState(X_MIN_DEFAULT);
  const [xMax, setXMax] = useState(X_MAX_DEFAULT);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);

  // Deep clone needed because we mutate params directly in the handler for the UI state
  const handleUpdateParam = (paramName: string, newValue: number) => {
    setCurrentFormula(prev => ({
      ...prev,
      params: prev.params.map(p => 
        p.name === paramName ? { ...p, value: newValue } : p
      )
    }));
  };

  const handleSelectFormula = (formula: Formula) => {
    // We need a fresh copy from the state (or constants if initial) to reset values
    // Find the formula in the current state list
    const freshFormula = formulas.find(f => f.id === formula.id);
    if (freshFormula) {
        // We must clone the params array and objects to avoid mutating the source reference
        const clonedFormula = {
            ...freshFormula,
            params: freshFormula.params.map(p => ({...p}))
        };
        setCurrentFormula(clonedFormula);
    }
  };

  const handleAddFormula = (newFormula: Formula) => {
    setFormulas(prev => {
        // Check for duplicate ID, if so, replace or append
        const exists = prev.some(f => f.id === newFormula.id);
        if (exists) {
            return prev.map(f => f.id === newFormula.id ? newFormula : f);
        }
        return [...prev, newFormula];
    });
    // Automatically select the new formula
    setCurrentFormula({
        ...newFormula,
        params: newFormula.params.map(p => ({...p}))
    });
  };

  return (
    <div className="flex h-screen w-screen bg-slate-100 text-slate-800 overflow-hidden font-sans">
      
      {/* Sidebar: Formula List */}
      <div className={`transition-all duration-300 ease-in-out border-r border-slate-200 bg-white shadow-sm flex flex-col ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full overflow-hidden'}`}>
        <div className="flex-1 overflow-hidden">
            <FormulaList 
                formulas={formulas}
                currentFormulaId={currentFormula.id} 
                onSelectFormula={handleSelectFormula} 
            />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header / Toolbar */}
        <header className="bg-white border-b border-slate-200 h-14 flex items-center justify-between px-4 shrink-0 z-20 shadow-sm">
            <div className="flex items-center space-x-3">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-500 hover:bg-slate-100 rounded">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hidden sm:block">
                    MathGenius AI
                </h1>
            </div>

            <div className="flex items-center space-x-4">
                 {/* X Axis Range Controls */}
                <div className="flex items-center space-x-2 bg-slate-100 rounded-lg px-3 py-1 text-sm">
                    <span className="text-slate-500 font-mono">X:</span>
                    <input 
                        type="number" 
                        value={xMin} 
                        onChange={(e) => setXMin(Number(e.target.value))}
                        className="w-12 bg-transparent border-b border-slate-300 focus:border-primary focus:outline-none text-center"
                    />
                    <span className="text-slate-400">to</span>
                    <input 
                        type="number" 
                        value={xMax} 
                        onChange={(e) => setXMax(Number(e.target.value))}
                        className="w-12 bg-transparent border-b border-slate-300 focus:border-primary focus:outline-none text-center"
                    />
                </div>

                <button 
                    onClick={() => setIsChatOpen(!isChatOpen)} 
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isChatOpen ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                    <span className="hidden sm:inline">AI 助教</span>
                </button>
            </div>
        </header>

        {/* Workspace */}
        <div className="flex-1 flex overflow-hidden relative">
            <div className="flex-1 flex flex-col h-full relative">
                {/* Graph Area */}
                <div className="flex-1 p-4 bg-slate-50 relative">
                     <div className="absolute inset-4 shadow-inner rounded-xl border border-slate-200 bg-white overflow-hidden">
                        <GraphViewer 
                            formula={currentFormula} 
                            xMin={xMin} 
                            xMax={xMax}
                        />
                     </div>
                </div>
                
                {/* Parameter Controls (Bottom Panel) */}
                <div className="shrink-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                     <ParameterControls 
                        formula={currentFormula} 
                        onUpdateParam={handleUpdateParam} 
                     />
                </div>
            </div>
        </div>
      </div>

      {/* Right Sidebar: AI Chat */}
      <div className={`transition-all duration-300 ease-in-out border-l border-slate-200 bg-white shadow-xl z-30 absolute right-0 top-0 bottom-0 md:static ${isChatOpen ? 'w-80 translate-x-0' : 'w-0 translate-x-full overflow-hidden'}`}>
         {isChatOpen && <AIChat currentFormula={currentFormula} onAddFormula={handleAddFormula} />}
      </div>
      
    </div>
  );
};

export default App;