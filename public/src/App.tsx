// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchStockData } from './api';
// import { selectData, selectSelectedStock } from './store/selectors';
// import { setSelectedStock } from './store/action';
// import StockTable from './components/StockTable';
// import StockSelector from './components/StockSelector';
// import { RootState } from './store/store';


// const App: React.FC = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state: RootState) => selectData(state));
//   const selectedStock = useSelector((state: RootState) => selectSelectedStock(state));

//   useEffect(() => {
//     const interval = setInterval(() => {
//       dispatch(fetchStockData(selectedStock));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [dispatch, selectedStock]);

//   const handleStockChange = (stock: string) => {
//     dispatch(setSelectedStock(stock));
//   };

//   return (
//     <div>
//       <h1>Stock and Crypto Tracker</h1>
//       <StockSelector onChange={handleStockChange} />
//       <StockTable data={data} />
//     </div>
//   );
// };

// export default App;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoData } from './store/cryptoSlice';
import { RootState, AppDispatch } from './store/store';
import StockTable from './components/StockTable';
import StockSelector from './components/StockSelector';
import './App.css'

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedCrypto = useSelector((state: RootState) => state.selectedCrypto);

    useEffect(() => {
        const interval = setInterval(() => {
          // fetchCryptoData()
          dispatch(fetchCryptoData(selectedCrypto));
        }, 5000);
        return () => clearInterval(interval);
    }, [dispatch, selectedCrypto]);
  

    return (
        <div className='m-5'>
            <h1 className='mb-5 font-extrabold text-black from-neutral-800'>Stock and Crypto Tracker</h1>
            <StockSelector />
            <div className=''>
                <StockTable />
            </div>
        </div>
    );
};

export default App;
