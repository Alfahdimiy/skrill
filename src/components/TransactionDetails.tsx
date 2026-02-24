import React from 'react';
import { ArrowLeft, FileText, Check, Repeat, User } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionDetailsProps {
  transaction: Transaction;
  onBack: () => void;
}

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction, onBack }) => {
  return (
    <div className="bg-white min-h-screen -m-4 p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-6">
          <button onClick={onBack} className="text-gray-800">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 italic font-serif">Transaction details</h1>
        </div>
        <button className="text-gray-800">
          <FileText size={24} />
        </button>
      </div>

      {/* Main Info Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white">
            <Check size={32} strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Funded</h2>
        </div>

        <div className="space-y-1">
          <p className="text-2xl font-bold text-gray-800">To: {transaction.recipient}</p>
        </div>

        <div className="space-y-1">
          <div className="flex space-x-4 text-2xl font-bold text-gray-900">
            <span>{transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {transaction.currency}</span>
            <span>{transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {transaction.currency}</span>
          </div>
          <p className="text-gray-400">Sent on: {transaction.date}</p>
          <p className="text-gray-400">Transaction number: {transaction.transactionNumber || '6861168712'}</p>
          <p className="text-gray-400 break-all">Bank card: {transaction.bankCard || 'SA9680000857608010251326'}</p>
        </div>
      </div>

      {/* Details Sections */}
      <div className="bg-[#f2f9f9] -mx-4 p-4 space-y-8">
        {/* Transfer Details */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-gray-600 border-b border-gray-200 pb-2">
            <Repeat size={20} className="rotate-180" />
            <h3 className="font-bold text-sm tracking-wider uppercase">Transfer Details</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-bold text-lg">You send:</span>
              <span className="text-gray-700 font-bold text-lg">{transaction.currency} {transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-bold text-lg">They receive:</span>
              <span className="text-gray-700 font-bold text-lg">{transaction.currency} {transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-bold text-lg">Exchange rate:</span>
              <span className="text-gray-700 font-bold text-lg">{transaction.exchangeRate || `USD 1.00 = 1.0000 USD`}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-bold text-lg">Fee:</span>
              <span className="text-gray-700 font-bold text-lg">{transaction.currency} {(transaction.fee || 168.18).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-bold text-lg">Total:</span>
              <span className="text-gray-700 font-bold text-lg">{transaction.currency} {(transaction.total || 4987.13).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-bold text-lg">Pay with:</span>
              <span className="text-gray-700 font-bold text-lg">{transaction.payWith || 'Debit card'}</span>
            </div>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-gray-600 border-b border-gray-200 pb-2">
            <User size={20} />
            <h3 className="font-bold text-sm tracking-wider uppercase">Recipient Details</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-gray-700 font-bold text-lg">Name:</span>
              <span className="text-gray-700 font-bold text-lg text-right max-w-[200px]">{transaction.recipient}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-bold text-lg">Account number:</span>
              <span className="text-gray-700 font-bold text-lg">{transaction.accountNumber || 'SA968***1326'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
