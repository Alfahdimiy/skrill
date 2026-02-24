import React from 'react';
import { Home, Bitcoin, Trophy, Gift } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'crypto', icon: Bitcoin, label: 'Crypto' },
    { id: 'sports', icon: Trophy, label: 'Sports' },
    { id: 'rewards', icon: Gift, label: 'Rewards' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 flex justify-between items-center z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors min-w-[64px] ${
            activeTab === tab.id ? 'text-skrill-purple' : 'text-gray-400'
          }`}
        >
          <tab.icon size={24} />
          <span className="text-[10px] font-bold">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};
