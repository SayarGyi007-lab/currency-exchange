export interface ConversionRequest {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}

export interface ConversionStep {
  from: string;
  to: string;
  rate: number;
  exchangeRateId: string;
}

export interface ConversionResponse {
  success: boolean;
  data: {
    type: "direct" | "bridge";
    steps: ConversionStep[];
    finalAmount: number;
    finalRate: number;
  };
}
