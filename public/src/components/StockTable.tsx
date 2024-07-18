import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const StockTable: React.FC = () => {
    const data = useSelector((state: RootState) => state.data);
    const selectedCrypto = useSelector((state: RootState) => state.selectedCrypto);

    return (
        <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-white">
          <tr>
            <th className="bg-slate-500 text-white text-xl py-4" colSpan={2}>{selectedCrypto.toLocaleUpperCase()}</th>
          </tr>
          <tr className="bg-blue-300">
            <th className="border border-gray-300 py-2 px-4">Timestamp</th>
            <th className="border border-gray-300 py-2 px-4">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-100">
              <td className="border border-gray-300 py-2 px-4 text-center">{new Date(entry.timestamp).toLocaleString()}</td>
              <td className="border border-gray-300 py-2 px-4">{entry.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    );
};

export default StockTable;
