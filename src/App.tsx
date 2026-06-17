/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { Crypto } from './components/Crypto';
import { TransactionsList } from './components/TransactionsList';
import { TransactionDetails } from './components/TransactionDetails';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { HelpCenter } from './components/HelpCenter';
import { MyCases } from './components/MyCases';
import { CaseDetails } from './components/CaseDetails';
import { UserProfile, Transaction } from './types';

const INITIAL_USER: UserProfile = {
  name: 'Aliyu Isa Aliyu',
  email: 'aliyu.isa@example.com',
  customerId: '368947706',
  balance: 1725.7,
  currency: 'USD',
};

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '10',
    type: 'deposit',
    amount: 2500,
    currency: 'SAR',
    sender: 'Almustapha ghali',
    date: 'Today',
    status: 'completed',
  },
  {
    id: '1',
    type: 'send',
    amount: 4818.95,
    currency: 'USD',
    recipient: 'محمود ناجح رزق محمد حسن',
    date: '22 Feb 2026',
    status: 'funded',
    fee: 168.18,
    total: 4987.13,
    transactionNumber: '6861168712',
    bankCard: 'SA9680000857608010251326',
    exchangeRate: 'USD 1.00 = 1.0000 USD',
    payWith: 'Debit card',
    accountNumber: 'SA968***1326'
  },
  {
    id: '2',
    type: 'send',
    amount: 2172.26,
    currency: 'USD',
    recipient: 'ALVARADO BOLI...',
    date: '25 Dec 2025',
    status: 'completed',
  },
  {
    id: '3',
    type: 'send',
    amount: 940.82,
    currency: 'USD',
    recipient: 'VALENTYN ZAKHA...',
    date: '18 Jul 2025',
    status: 'completed',
  },
  {
    id: '4',
    type: 'deposit',
    amount: 110.00,
    currency: 'USD',
    sender: 'with MASTERCARD ...',
    date: '23 May 2025',
    status: 'completed',
  },
  {
    id: '5',
    type: 'send',
    amount: 793.36,
    currency: 'USD',
    recipient: 'DUDA MYKHAILO (...',
    date: '23 May 2025',
    status: 'completed',
  },
  {
    id: '6',
    type: 'deposit',
    amount: 683.36,
    currency: 'USD',
    sender: 'with MASTERCARD ...',
    date: '23 May 2025',
    status: 'completed',
  },
  {
    id: '7',
    type: 'deposit',
    amount: 683.36,
    currency: 'USD',
    sender: 'with MASTERCARD ...',
    date: '23 May 2025',
    status: 'completed',
  },
  {
    id: '8',
    type: 'send',
    amount: 1371.72,
    currency: 'USD',
    recipient: 'OLEKSANDRA BR...',
    date: '20 May 2025',
    status: 'completed',
  },
  {
    id: '9',
    type: 'send',
    amount: 665.73,
    currency: 'USD',
    recipient: 'Yevhenii Kharakoz (...',
    date: '20 May 2025',
    status: 'completed',
  },
];

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showMyCases, setShowMyCases] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  if (!isAppReady) {
    return <SplashScreen onFinish={() => setIsAppReady(true)} />;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    if (selectedCaseId) {
      return <CaseDetails onBack={() => setSelectedCaseId(null)} />;
    }

    if (showMyCases) {
      return <MyCases onBack={() => setShowMyCases(false)} onCaseClick={setSelectedCaseId} />;
    }

    if (showHelpCenter) {
      return <HelpCenter onBack={() => setShowHelpCenter(false)} onMyCasesClick={() => setShowMyCases(true)} />;
    }

    if (showProfile) {
      return <Profile user={user} onBack={() => setShowProfile(false)} onHelpCenterClick={() => setShowHelpCenter(true)} />;
    }

    if (selectedTransaction) {
      return <TransactionDetails transaction={selectedTransaction} onBack={() => setSelectedTransaction(null)} />;
    }

    if (showAllTransactions) {
      return <TransactionsList transactions={transactions} onBack={() => setShowAllTransactions(false)} onSelectTransaction={setSelectedTransaction} />;
    }

    switch (activeTab) {
      case 'home':
        return (
          <Dashboard 
            user={user} 
            transactions={transactions.slice(0, 3)} 
            onSeeAll={() => setShowAllTransactions(true)} 
            onSelectTransaction={setSelectedTransaction}
            onProfileClick={() => setShowProfile(true)}
          />
        );
      case 'crypto':
        return <Crypto />;
      case 'profile':
        return <Profile user={user} onBack={() => {}} onHelpCenterClick={() => setShowHelpCenter(true)} />;
      case 'transfer':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="w-16 h-16 bg-skrill-purple/10 rounded-full flex items-center justify-center text-skrill-purple">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </motion.div>
            </div>
            <h2 className="text-xl font-bold">Transfer Money</h2>
            <p className="text-gray-500 text-center px-8">Send money to any email address or Skrill customer globally.</p>
            <button className="btn-primary">Start Transfer</button>
          </div>
        );
      case 'pay':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="w-16 h-16 bg-skrill-purple/10 rounded-full flex items-center justify-center text-skrill-purple">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
            </div>
            <h2 className="text-xl font-bold">Pay Online</h2>
            <p className="text-gray-500 text-center px-8">Use your Skrill balance to pay at thousands of online stores.</p>
            <button className="btn-primary">Explore Merchants</button>
          </div>
        );
      default:
        return <Dashboard user={user} transactions={transactions} onSeeAll={() => {}} onSelectTransaction={() => {}} onProfileClick={() => {}} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-skrill-light relative overflow-x-hidden">
      <main className="p-4 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCaseId ? 'case-details' : showProfile ? 'profile' : selectedTransaction ? 'details' : showAllTransactions ? 'list' : showHelpCenter ? 'help' : showMyCases ? 'my-cases' : activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      {(!showAllTransactions && !selectedTransaction && !showProfile && !showHelpCenter && !showMyCases && !selectedCaseId) && <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
}
