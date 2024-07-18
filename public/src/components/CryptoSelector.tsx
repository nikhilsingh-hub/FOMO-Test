import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCryto, fetchCryptoData } from '../store/cryptoSlice';
import { RootState, AppDispatch } from '../store/store';

const CryptoSelector: React.FC = () => {
    const currentCrypto = useSelector((state: RootState) => state.selectedCrypto);
    const [selectedCryptoState, setSelectedCryptoState] = useState<string>(currentCrypto || '');
    const [modal, setModal] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const coins: string[] = ['bitcoin', 'ethereum', 'solana', 'dogecoin', 'litecoin'];
    const selectRef = useRef<HTMLSelectElement>(null);

    const handleSubmit = () => {
        if (selectRef.current) {
            const selectedValue = selectRef.current.value;
            dispatch(setSelectedCryto(selectedValue));
            dispatch(fetchCryptoData(selectedValue));
            setModal(false);
        }
       
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (modal && !event.target.closest('.modal') && !event.target.closest('.cryptoButton')) {
                setModal(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
    })

    return (
        <div className='items-end justify-end'>
            <button className='cryptoButton rounded-lg bg-blue-400 p-2 text-white font-bold' onClick={() => setModal(true)}>Select Crypto</button>
            {
                modal && <div className='fixed top-0 left-0 flex items-center justify-center h-full w-full bg-black opacity-80'>

                    <div className='modal bg-slate-200 border-2 border-red-400 text-black rounded-lg p-10'>
                        <h3 className='text-center font-bold from-neutral-800'>Select Crypto</h3>
                        <div className='flex flex-row gap-8 p-4 rounded-lg'>
                            <select ref={selectRef} className="rounded-md px-3 py-1 bg-gray-200 text-black border border-gray-300 focus:ring-2 focus:ring-blue-500"
                             value={selectedCryptoState}
                             onChange={(e) => setSelectedCryptoState(e.target.value)}
                            >
                                {coins.map((coin, index) => (
                                    <option key={index} value={coin}>{coin}</option>
                                ))}
                            </select>
                            <button className='rounded-lg bg-blue-500 text-white font-bold p-2 hover:bg-blue-700' onClick={handleSubmit}>Search</button>
                        </div>
                    </div>

                </div>
            }
        </div>
    );
};

export default CryptoSelector;
