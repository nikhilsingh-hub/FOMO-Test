import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoData, fetchCoins } from './store/cryptoSlice';
import { RootState, AppDispatch } from './store/store';
import CryptoTable from './components/CryptoTable';
import CryptoSelector from './components/CryptoSelector';
import './App.css'

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedCrypto = useSelector((state: RootState) => state.selectedCrypto);

    useEffect(() => {
        const interval = setInterval(() => {
          // fetchCryptoData()
          dispatch(fetchCoins())
          dispatch(fetchCryptoData(selectedCrypto));
        }, 5000);
        return () => clearInterval(interval);
    }, [dispatch, selectedCrypto]);
  

    return (
        <div className='m-5'>
            <h1 className='mb-5 font-extrabold text-black from-neutral-800'>Stock and Crypto Tracker</h1>
            <CryptoSelector />
            <div className=''>
                <CryptoTable />
            </div>
        </div>
    );
};

export default App;
