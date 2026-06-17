import React from 'react';
import { 
  ChevronRight, 
  ArrowLeft,
  User as UserIcon
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  user: UserProfile;
  onBack: () => void;
  onHelpCenterClick: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onBack, onHelpCenterClick }) => {
  const menuItems = [
    { label: 'Verification and features' },
    { label: 'Payment controls' },
    { label: 'Skrill levels' },
    { label: 'Theme mode', value: 'System' },
    { 
      label: 'Log in with biometrics', 
      description: 'Access your Skrill account quickly and securely with fingerprint or face recognition.',
      toggle: true,
      active: true
    },
    { 
      label: 'Turn on notifications', 
      description: 'Get real-time updates on your transactions and other relevant information.',
      toggle: true,
      active: false
    },
    { label: 'Personal details' },
    { label: 'Help center', action: onHelpCenterClick },
    { label: 'Privacy settings' },
    { label: 'Terms and Conditions' },
    { label: 'End User License Agreement' },
    { label: 'Privacy Notice' },
    { label: 'Cookie Notice' },
    { label: 'Personal Data Requests' },
  ];

  return (
    <div className="bg-white min-h-screen -m-4 p-4 space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center space-x-6 pt-2">
        <button onClick={onBack} className="text-gray-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center space-y-3 pt-4">
        <div className="w-24 h-24 bg-[#d1d5db] rounded-full flex items-center justify-center text-gray-600">
          <UserIcon size={48} />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-xl text-gray-600">Customer ID: {user.customerId}</p>
          <div className="pt-1">
            <span className="bg-[#e0f2f1] text-[#00695c] px-4 py-1 rounded-full text-sm font-medium">
              Skriller
            </span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-0 pt-4">
        {menuItems.map((item, index) => (
          <div key={index} className="py-4 border-b border-gray-50 last:border-0">
            {item.toggle ? (
              <div className="flex justify-between items-start space-x-4">
                <div className="space-y-1 flex-1">
                  <p className="text-xl font-bold text-gray-800">{item.label}</p>
                  <p className="text-lg text-gray-500 leading-tight">{item.description}</p>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors mt-1 ${item.active ? 'bg-skrill-purple' : 'bg-gray-300'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.active ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
            ) : (
              <button onClick={item.action} className="w-full flex items-center justify-between text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-gray-800">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.value && <span className="text-xl font-bold text-gray-900 mr-1">{item.value}</span>}
                  <ChevronRight size={24} className="text-gray-400" />
                </div>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-4 space-y-8">
        <p className="text-lg text-gray-400">Version 3.178.0-2026020916</p>
        <button className="w-full text-center text-skrill-purple text-xl font-bold py-4">
          Log out
        </button>
      </div>
    </div>
  );
};
