import React, { useState } from 'react';
import { 
  Plus, 
  Repeat, 
  RefreshCw, 
  BarChart2, 
  Bell, 
  User,
  ArrowDownLeft,
  ArrowUpRight
} from 'lucide-react';
import { Transaction, UserProfile } from '../types';

interface DashboardProps {
  user: UserProfile;
  transactions: Transaction[];
  onSeeAll: () => void;
  onSelectTransaction: (tx: Transaction) => void;
  onProfileClick: () => void;
}

const isStickyTransaction = (tx: Transaction) => {
  return tx.type === 'send' && Math.abs(Math.abs(tx.amount) - 4818.95) < 0.01;
};

export const Dashboard: React.FC<DashboardProps> = ({ user, transactions, onSeeAll, onSelectTransaction, onProfileClick }) => {
  const [currentCurrency, setCurrentCurrency] = useState<'SAR' | 'USD'>('SAR');
  const conversionRate = 3.75; // 1 USD = 3.75 SAR
  const sarBalance = user.balance * conversionRate;
  const income = transactions.filter(tx => tx.type === 'deposit').reduce((acc, tx) => acc + tx.amount, 0);

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50 

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe || isRightSwipe) {
      setCurrentCurrency(prev => prev === 'SAR' ? 'USD' : 'SAR');
    }
  }

  const handleCurrencyChange = (currency: 'SAR' | 'USD') => {
    setCurrentCurrency(currency);
  }

  const balance = currentCurrency === 'SAR' ? sarBalance : user.balance;
  const currencySymbol = currentCurrency === 'SAR' ? 'SAR' : 'US$';
  const currencyName = currentCurrency === 'SAR' ? 'Saudi Riyal' : 'US Dollar';
  const flag = currentCurrency === 'SAR' ? '🇸🇦' : '🇺🇸';

  return (
    <div className="space-y-8 pb-24 bg-white min-h-screen -m-4 p-4">
      {/* Header */}
      <div className="flex justify-between items-center pt-2">
        <button 
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 active:bg-gray-50 transition-colors"
        >
          <User size={24} />
        </button>
        <div className="flex space-x-4 text-gray-600">
          <BarChart2 size={24} />
          <Bell size={24} />
        </div>
      </div>

      {/* Balance Section */}
      <div 
        className="flex flex-col items-center space-y-2"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex items-center space-x-2 text-gray-500 text-sm">
          <span className="text-lg">{flag}</span>
          <span>{currencyName}</span>
        </div>
        <h2 className="text-5xl font-bold text-gray-900 tracking-tight">
          {currencySymbol} {balance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
        </h2>
        <div className="flex space-x-1.5 pt-2">
          <div 
            onClick={() => handleCurrencyChange('SAR')}
            className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${currentCurrency === 'SAR' ? 'w-6 bg-skrill-purple' : 'w-1.5 bg-gray-200'}`}
          />
          <div 
            onClick={() => handleCurrencyChange('USD')}
            className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${currentCurrency === 'USD' ? 'w-6 bg-skrill-purple' : 'w-1.5 bg-gray-200'}`}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-6">
        <div className="flex flex-col items-center space-y-3">
          <button className="w-16 h-16 bg-skrill-purple rounded-2xl flex items-center justify-center text-white shadow-sm">
            <Plus size={32} strokeWidth={2.5} />
          </button>
          <span className="text-skrill-purple font-bold text-lg">Add</span>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <button className="w-16 h-16 bg-[#b36b94] rounded-2xl flex items-center justify-center text-white shadow-sm">
            <Repeat size={32} strokeWidth={2.5} />
          </button>
          <span className="text-skrill-purple font-bold text-lg">Transfer</span>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <button className="w-16 h-16 bg-[#b36b94] rounded-2xl flex items-center justify-center text-white shadow-sm">
            <RefreshCw size={32} strokeWidth={2.5} />
          </button>
          <span className="text-skrill-purple font-bold text-lg text-center leading-tight">Exchange</span>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">Transactions</h3>
          <button onClick={onSeeAll} className="text-skrill-purple text-lg font-bold">See all</button>
        </div>
        <div className="space-y-6">
          {transactions.map((tx) => {
            let displayedAmount;
            
            if (currentCurrency === 'SAR') {
              if (tx.currency === 'USD') {
                displayedAmount = tx.amount * conversionRate;
              } else {
                displayedAmount = tx.amount;
              }
            } else { // currentCurrency is 'USD'
              if (tx.currency === 'SAR') {
                displayedAmount = tx.amount / conversionRate;
              } else {
                displayedAmount = tx.amount;
              }
            }
            
            if (isStickyTransaction(tx) && currentCurrency === 'SAR') {
              displayedAmount = -19999;
            }

            return (
              <div key={tx.id} className="flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors" onClick={() => onSelectTransaction(tx)}>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500`}>
                    {tx.type === 'deposit' ? (
                      <ArrowDownLeft size={24} />
                    ) : (
                      <ArrowUpRight size={24} />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-800 leading-tight">{tx.recipient || tx.sender}</p>
                    <p className="text-sm text-gray-400">{tx.type === 'send' ? 'Skrill Money Transfer' : 'Money Received'}</p>
                  </div>
                </div>
                <div className="text-right">
                <p className={`font-bold text-lg ${tx.type === 'send' ? 'text-gray-900' : 'text-green-500'}`}>
                    {tx.type === 'send' ? '- ' : '+ '}{currencySymbol}{' '}
                    {Math.abs(displayedAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-gray-400">{tx.date}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">Analytics</h3>
          <button className="text-skrill-purple text-lg font-bold">View more</button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
          <div className="min-w-[180px] bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex flex-col items-center space-y-4">
            <span className="text-gray-800 font-medium">Feb 2026</span>
            <div className="w-20 h-20 rounded-full border-[12px] border-gray-100 relative">
              <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-t-skrill-purple rotate-45"></div>
            </div>
          </div>
          <div className="min-w-[220px] bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
              <span className="text-gray-800 font-medium">Income</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {currentCurrency === 'SAR' ? 'SAR' : 'USD'}{' '}
                {(currentCurrency === 'SAR' ? income * conversionRate : income).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <div className="h-[1px] bg-gray-200 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
