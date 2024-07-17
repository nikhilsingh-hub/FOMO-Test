// import React, { useState } from 'react';

// interface StockSelectorProps {
//   onChange: (stock: string) => void;
// }

// const StockSelector: React.FC<StockSelectorProps> = ({ onChange }) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedStock, setSelectedStock] = useState('');

//   const handleSubmit = () => {
//     onChange(selectedStock);
//     setModalOpen(false);
//   };

//   return (
//     <div>
//       <button onClick={() => setModalOpen(true)}>Change Stock/Crypto</button>
//       {modalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <input
//               type="text"
//               value={selectedStock}
//               onChange={(e) => setSelectedStock(e.target.value)}
//               placeholder="Enter stock or crypto"
//             />
//             <button onClick={handleSubmit}>Submit</button>
//             <button onClick={() => setModalOpen(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StockSelector;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedCryto, fetchCryptoData } from '../store/cryptoSlice';
import { AppDispatch } from '../store/store';

const StockSelector: React.FC = () => {
    const [selectedStock, setSelectedStockState] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = () => {
        dispatch(setSelectedCryto(selectedStock));
        dispatch(fetchCryptoData(selectedStock));
    };

    return (
        <div className='items-end justify-end'>
                    <div className="w-fit">
                        <input
                            className='p-2 border-spacing-2 border-red-100'
                            type="text"
                            value={selectedStock}
                            onChange={(e) => setSelectedStockState(e.target.value)}
                            placeholder="Enter stock or crypto"
                        />
                        <button className='rounded-lg bg-blue-500 text-white font-bold p-2 hover:bg-blue-700' onClick={handleSubmit}>Search</button>
                    </div>
        </div>
    );
};

export default StockSelector;
