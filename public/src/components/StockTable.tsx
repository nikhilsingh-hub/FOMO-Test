// import React from 'react';
// import { StockData } from '../store/types';

// interface StockTableProps {
//   data: StockData[];
// }

// const StockTable: React.FC<StockTableProps> = ({ data }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Timestamp</th>
//           <th>Price</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.slice(0, 20).map((entry, index) => (
//           <tr key={index}>
//             <td>{new Date(entry.timestamp).toLocaleString()}</td>
//             <td>{entry.price}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default StockTable;
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const StockTable: React.FC = () => {
    const data = useSelector((state: RootState) => state.data);

    return (
        <table>
            <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {data.map((entry, index) => (
                    <tr key={index}>
                        <td>{new Date(entry.timestamp).toLocaleString()}</td>
                        <td>{entry.price}</td>
                    </tr>
                ))}
                {/* <td>nikhil</td>
                <td>eferg</td> */}
            </tbody>
        </table>
    );
};

export default StockTable;
