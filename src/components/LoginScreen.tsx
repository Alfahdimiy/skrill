import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Delete, Fingerprint } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [showFingerprint, setShowFingerprint] = useState(false);
  const maxPinLength = 6;

  useEffect(() => {
    if (pin.length === maxPinLength) {
      const timer = setTimeout(() => {
        onLogin();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pin, onLogin]);

  useEffect(() => {
    const timer = setTimeout(() => setShowFingerprint(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNumberClick = (num: string) => {
    if (pin.length < maxPinLength) {
      setPin(prev => prev + num);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleFingerprintLogin = () => {
    setShowFingerprint(false);
    onLogin();
  };

  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'delete']
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col p-6 relative">
      {/* Fingerprint Overlay */}
      {showFingerprint && (
        <motion.div 
          className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-gray-500 font-medium">Skrill</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-8">Log in with your fingerprint</h2>
          <motion.div
            onClick={handleFingerprintLogin}
            className="w-24 h-24 text-skrill-purple cursor-pointer"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Fingerprint size={96} strokeWidth={1} />
          </motion.div>
          <button 
            onClick={() => setShowFingerprint(false)} 
            className="mt-12 text-gray-500 font-bold py-2 px-4 rounded-full"
          >
            Enter PIN
          </button>
        </motion.div>
      )}

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

      {/* PIN Display */}
      <div className="flex-grow flex items-center justify-center">
        <div className="flex space-x-4">
          {Array.from({ length: maxPinLength }).map((_, i) => (
            <motion.div 
              key={i} 
              className={`w-4 h-4 rounded-full ${i < pin.length ? 'bg-skrill-purple' : 'bg-gray-200'}`}
              animate={{ scale: i === pin.length -1 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {keypadNumbers.flat().map((num, i) => (
          <button 
            key={i} 
            onClick={() => num === 'delete' ? handleDelete() : handleNumberClick(num)}
            className="h-20 text-3xl font-medium text-gray-700 active:bg-gray-100 rounded-full disabled:opacity-0"
            disabled={num === ''}
          >
            {num === 'delete' ? <Delete className="mx-auto" /> : num}
          </button>
        ))}
      </div>
    </div>
  );
}
