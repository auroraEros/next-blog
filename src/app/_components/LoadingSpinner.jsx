// components/LoadingSpinner.jsx
'use client';
import { ClipLoader } from 'react-spinners';

export default function LoadingSpinner({ size = 40, color = '#4f46e5' }) {
  return (
    <div className="flex justify-center items-center p-8 w-full">
      <ClipLoader 
        size={size}
        color={color}
        aria-label="Loading Spinner"
      />
    </div>
  );
}