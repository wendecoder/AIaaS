import React, { useEffect } from 'react';

interface FeatureModalProps {
  children: React.ReactNode; // Type for children
  onClose: () => void; // Type for onClose function
}

const FeatureModal: React.FC<FeatureModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    // Add event listener to listen for the "Escape" key press
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>

        {/* Render the content of the specific feature */}
        {children}
      </div>
    </div>
  );
};

export default FeatureModal;
