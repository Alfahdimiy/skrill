
import React from 'react';
import { ArrowLeft, Search, ChevronRight, User, GitBranch, Key, Shield, FileText, MessageSquare, FileQuestion } from 'lucide-react';

interface HelpCenterProps {
  onBack: () => void;
  onMyCasesClick: () => void;
}

export const HelpCenter: React.FC<HelpCenterProps> = ({ onBack, onMyCasesClick }) => {
  const faqItems = [
    { icon: User, title: 'Account', description: 'Profile settings, verifications, limits & more' },
    { icon: GitBranch, title: 'Payments', description: 'Deposits, money transfers and online payments' },
    { icon: Key, title: 'Crypto', description: 'Trading, P2P transfers, orders and alerts' },
    { icon: Shield, title: 'International Money Transfer', description: 'Remittance, local and cross-border transfers' },
    { icon: Shield, title: 'Security', description: 'Account status, disputed transactions & more' },
    { icon: FileText, title: 'International Wallet', description: '' },
  ];

  const supportItems = [
    { icon: MessageSquare, title: 'Chat with Sofia', description: 'Get instant help, available 24/7' },
    { icon: FileQuestion, title: 'My cases', description: 'View and manage your support cases', action: onMyCasesClick },
  ];

  return (
    <div className="bg-gray-50 min-h-screen -m-4 p-4 font-sans">
      <div className="flex items-center justify-between pt-2">
        <button onClick={onBack} className="text-gray-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Help center</h1>
        <button className="text-gray-800">
          <Search size={24} />
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-500 px-2">Browse FAQ</h2>
        <div className="bg-white rounded-lg mt-2">
          {faqItems.map((item, index) => (
            <div key={index} className={`flex items-center p-4 space-x-4 ${index < faqItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <item.icon size={24} className="text-gray-500" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                {item.description && <p className="text-gray-500 text-sm">{item.description}</p>}
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-500 px-2">Additional support</h2>
        <div className="bg-white rounded-lg mt-2">
          {supportItems.map((item, index) => (
            <button key={index} onClick={item.action} className={`w-full flex items-center p-4 space-x-4 text-left ${index < supportItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <item.icon size={24} className="text-gray-500" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
