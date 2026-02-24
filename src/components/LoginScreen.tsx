import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Delete } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const maxPinLength = 6;

  useEffect(() => {
    if (pin.length === maxPinLength) {
      // Auto-login when PIN is complete
      const timer = setTimeout(() => {
        onLogin();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pin, onLogin]);

  const handleNumberClick = (num: string) => {
    if (pin.length < maxPinLength) {
      setPin(prev => prev + num);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'delete']
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-gray-800">PIN</h1>
      </div>

      {/* Account Selector */}
      <div className="mt-8 bg-gray-50 rounded-xl p-4 flex justify-between items-center border border-gray-100">
        <div className="space-y-0.5">
          <p className="text-xs text-gray-400 font-medium">Account</p>
          <p className="text-lg text-gray-700 font-medium">bellosadiqa@gmail.com</p>
        </div>
        <ChevronDown size={20} className="text-gray-400" />
      </div>

      {/* PIN Display Area */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        <div className="text-center space-y-8">
          <p className="text-gray-400 text-lg font-medium">Enter PIN</p>
          
          {/* PIN Dots */}
          <div className="flex space-x-4 justify-center">
            {[...Array(maxPinLength)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  i < pin.length ? 'bg-skrill-purple' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <button className="text-skrill-purple font-bold text-lg">
          Forgot PIN
        </button>
      </div>

      {/* Numeric Keypad */}
      <div className="pb-8">
        <div className="grid grid-cols-3 gap-y-8">
          {keypadNumbers.flat().map((val, idx) => {
            if (val === '') return <div key={idx} />;
            
            if (val === 'delete') {
              return (
                <button
                  key={idx}
                  onClick={handleDelete}
                  className="flex items-center justify-center h-16 active:bg-gray-50 rounded-full transition-colors"
                >
                  <div className="bg-gray-100 p-2 rounded-md text-gray-600">
                    <Delete size={24} />
                  </div>
                </button>
              );
            }

            return (
              <button
                key={idx}
                onClick={() => handleNumberClick(val)}
                className="text-4xl font-bold text-skrill-purple h-16 active:bg-gray-50 rounded-full transition-colors"
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
