import React from 'react';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionsListProps {
  transactions: Transaction[];
  onBack: () => void;
  onSelectTransaction: (tx: Transaction) => void;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ transactions, onBack, onSelectTransaction }) => {
  // Group transactions by year/today
  const groupedTransactions = transactions.reduce((groups: { [key: string]: Transaction[] }, tx) => {
    const year = tx.date.split(' ').pop() || '';
    const groupKey = tx.date.includes('2026') ? 'Today' : year;
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(tx);
    return groups;
  }, {});

  // Sort keys so 'Today' comes first, then descending years
  const sortedKeys = Object.keys(groupedTransactions).sort((a, b) => {
    if (a === 'Today') return -1;
    if (b === 'Today') return 1;
    return parseInt(b) - parseInt(a);
  });

  return (
    <div className="bg-white min-h-screen -m-4 p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-6 pt-2">
        <button onClick={onBack} className="text-gray-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">All Transactions</h1>
      </div>

      <div className="space-y-8">
        {sortedKeys.map((key) => (
          <div key={key} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">{key}</h2>
            <div className="space-y-6">
              {groupedTransactions[key].map((tx) => (
                <div key={tx.id} className="flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors" onClick={() => onSelectTransaction(tx)}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 relative">
                      {tx.type === 'deposit' ? (
                        <>
                          <Download size={20} className="text-gray-400" />
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                        </>
                      ) : (
                        <div className="border-2 border-gray-300 rounded-md p-0.5">
                          <ArrowRight size={16} className="rotate-[-45deg]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-800 leading-tight">{tx.recipient || tx.sender}</p>
                      <p className="text-sm text-gray-400">
                        {tx.type === 'deposit' ? 'Deposit' : 'Skrill Money Transfer'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${tx.type === 'deposit' ? 'text-green-600' : 'text-gray-500'}`}>
                      USD {tx.type === 'deposit' ? '' : '-'}{Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-400">{tx.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
