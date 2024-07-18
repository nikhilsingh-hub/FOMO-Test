import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { cryptoData } from './types';

interface cryptoState {
  data: cryptoData[];
  selectedCrypto: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: cryptoState = {
  data: [],
  selectedCrypto: 'bitcoin',
  status: 'idle',
  error: null
}

export const fetchCryptoData = createAsyncThunk('crypto/fetchCryptoData',
  async (cointype: string) => {
    // async () => {
    const response = await fetch(`http://localhost:8080/getRecentData/${cointype}`);

    if (!response.ok) throw new Error('Failed to fetch products');

    const data = await response.json();
    return data;
  }
)

export const cryptoSlice = createSlice({
  name: 'cryptos',
  initialState,
  reducers: {
    setSelectedCryto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchCryptoData.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchCryptoData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
            state.error = null;
        })
        .addCase(fetchCryptoData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || null;
        });
},
})

export const { setSelectedCryto } = cryptoSlice.actions;

export default cryptoSlice.reducer;