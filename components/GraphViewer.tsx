import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Formula, PlotDataPoint } from '../types';
import { generatePlotData } from '../utils/mathUtils';

interface GraphViewerProps {
  formula: Formula;
  xMin: number;
  xMax: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-2 border border-slate-200 rounded shadow-lg text-xs">
        <p className="font-mono">x: {Number(label).toFixed(2)}</p>
        <p className="font-mono text-primary">y: {payload[0].value !== null ? Number(payload[0].value).toFixed(2) : 'Undefined'}</p>
      </div>
    );
  }
  return null;
};

const GraphViewer: React.FC<GraphViewerProps> = ({ formula, xMin, xMax }) => {
  const data: PlotDataPoint[] = useMemo(() => {
    return generatePlotData(formula.expression, formula.params, xMin, xMax);
  }, [formula.expression, formula.params, xMin, xMax]);

  // Dynamic Y-domain calculation to prevent graph from squashing flat if y is huge
  const yDomain = useMemo(() => {
    // Filter out infinities and nulls
    const validYs = data
      .map(d => d.y)
      .filter((y): y is number => y !== null && isFinite(y));
    
    if (validYs.length === 0) return [-10, 10];
    
    let min = Math.min(...validYs);
    let max = Math.max(...validYs);
    
    // Add padding
    const padding = (max - min) * 0.1;
    if (padding === 0) return [min - 1, max + 1];

    // Clamp for extreme values to keep graph readable
    return [Math.max(min - padding, -100), Math.min(max + padding, 100)]; 
  }, [data]);

  return (
    <div className="w-full h-full bg-white relative rounded-lg overflow-hidden select-none">
       {/* Grid Background visual helper handled by Recharts CartesianGrid */}
       
       <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="x" 
            type="number" 
            domain={[xMin, xMax]} 
            tickCount={10}
            allowDataOverflow={true}
            stroke="#94a3b8"
            tick={{ fontSize: 10 }}
          />
          <YAxis 
            domain={yDomain} 
            allowDataOverflow={true}
            stroke="#94a3b8"
            tick={{ fontSize: 10 }}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }} />
          
          <ReferenceLine y={0} stroke="#64748b" strokeWidth={2} />
          <ReferenceLine x={0} stroke="#64748b" strokeWidth={2} />
          
          <Line
            type="monotone" // or "natural", but monotone is better for functions usually
            dataKey="y"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false} // Performance
            connectNulls={false} // Don't connect over asymptotes
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full shadow-sm border border-slate-200">
        <span className="text-sm font-mono text-primary font-bold">{formula.displayLatex}</span>
      </div>
    </div>
  );
};

export default GraphViewer;