import * as math from 'mathjs';
import { Parameter, PlotDataPoint } from '../types';
import { POINT_COUNT } from '../constants';

export const generatePlotData = (
  expression: string,
  params: Parameter[],
  xMin: number,
  xMax: number
): PlotDataPoint[] => {
  const data: PlotDataPoint[] = [];
  const step = (xMax - xMin) / (POINT_COUNT - 1);

  // Compile the expression once
  let compiledExpr;
  try {
    compiledExpr = math.compile(expression);
  } catch (error) {
    console.error("Formula compilation error:", error);
    return [];
  }

  // Prepare scope with parameter values
  const scope: Record<string, number> = {};
  params.forEach(p => {
    scope[p.name] = p.value;
  });

  for (let i = 0; i < POINT_COUNT; i++) {
    const x = xMin + i * step;
    scope['x'] = x;
    
    try {
      let y = compiledExpr.evaluate(scope);
      
      // Handle special cases like Infinity, NaN, or Complex numbers
      if (typeof y === 'object' && 're' in y) {
        // If complex, verify if imaginary part is negligible, else null
        y = Math.abs(y.im) < 1e-10 ? y.re : null;
      }
      
      if (!isFinite(y) || isNaN(y)) {
        y = null;
      }

      data.push({ x, y });
    } catch (e) {
      data.push({ x, y: null });
    }
  }

  return data;
};

export const formatParamsForPrompt = (params: Parameter[]): string => {
  return params.map(p => `${p.name}=${p.value}`).join(', ');
};
