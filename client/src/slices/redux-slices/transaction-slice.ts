import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TransactionState {
  amount: number;
  from: string;
  to: string;
  result: number;

  fromCurrencyId: string;
  toCurrencyId: string;
  exchangeRateId: string; 
  exchangeRate: number;

  paymentMethodId?: string;
  steps: {
    from: string;
    to: string;
    rate: number;
    exchangeRateId: string;
  }[];
}

const initialState: TransactionState = {
  amount: 0,
  from: "",
  to: "",
  result: 0,
  fromCurrencyId: "",
  toCurrencyId: "",
  exchangeRateId: "",
  exchangeRate: 0,
  steps: [], 
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactionData: (state, action: PayloadAction<Partial<TransactionState>>) => {
      return { ...state, ...action.payload };
    },
    setSteps: (state, action: PayloadAction<TransactionState["steps"]>) => {
      state.steps = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethodId = action.payload;
    },
    clearTransaction: () => initialState,
  },
});

export const {
  setTransactionData,
  setSteps,
  setPaymentMethod,
  clearTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;