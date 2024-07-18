import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { cryptoData } from './types';
import { promises } from 'dns';

interface cryptoState {
  data: cryptoData[];
  coinList: string[];
  selectedCrypto: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: cryptoState = {
  data: [],
  coinList:[],
  selectedCrypto: 'bitcoin',
  status: 'idle',
  error: null
}

// Async thunk to fetch crypto data
export const fetchCryptoData = createAsyncThunk('crypto/fetchCryptoData',
  async (cointype: string) => {
    const response = await fetch(`http://localhost:8080/api/getRecentData/${cointype}`);

    if (!response.ok) throw new Error('Failed to fetch products');

    const data = await response.json();
    return data;
  }
)

// Async thunk to fetch coin list
export const fetchCoins = createAsyncThunk('crypto/coinList', async () => {
  const response = await fetch(`http://localhost:8080/api/coinList`);

  if(!response.ok) throw new Error('Failed to fetch List')

  const data = await response.json();
  return data;
})


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
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.coinList = action.payload; // Update coins array with fetched data
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.coinList = [];
      });
  },
 
})

export const { setSelectedCryto } = cryptoSlice.actions;

export default cryptoSlice.reducer;