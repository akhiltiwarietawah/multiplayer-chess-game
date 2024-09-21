// components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string; // Updated to handle any message
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">Notification</h2>
        <p className="text-center text-xl">{message}</p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
