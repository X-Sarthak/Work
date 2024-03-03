// import React from 'react';

// interface InfoCardAdminProps {
//   label: string;
//   value: string;
//   onSave: () => void;
//   isSaved: boolean;
//   onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   isEditing: boolean;
// }

// const InfoCardAdmin: React.FC<InfoCardAdminProps> = ({
//   label,
//   value,
//   onSave,
//   isSaved,
//   onInputChange,
//   isEditing,
// }) => {
//   return (
//     <div className='bg-white p-4 rounded-md shadow-md'>
//       <h3 className='text-lg font-semibold mb-2'>{label}</h3>
//       <div className='flex items-center'>
//         <input
//           type='text'
//           value={value}
//           onChange={onInputChange}
//           disabled={!isEditing}
//           className='border rounded-md p-2 flex-1'
//         />
//         {!isSaved && (
//           <button
//             onClick={onSave}
//             className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-md'
//           >
//             Save
//           </button>
//         )}
//       </div>
//     </div>
    
//   );
// };

// export default InfoCardAdmin;