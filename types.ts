export interface Parameter {
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  description: string;
}

export interface Formula {
  id: string;
  name: string;
  category: string;
  expression: string; // The mathematical expression string compatible with mathjs
  displayLatex: string; // Representation for UI
  params: Parameter[];
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface PlotDataPoint {
  x: number;
  y: number | null;
}

export enum ViewState {
  GRAPH = 'GRAPH',
  SETTINGS = 'SETTINGS'
}