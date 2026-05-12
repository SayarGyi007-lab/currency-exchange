export interface Chart {
  timestamp: string;   // or Date
  buyRate: number;
  sellRate: number;
}

export interface ChartResponse {
  message: string;
  data: Chart[];
}