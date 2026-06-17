import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface MyCasesProps {
  onBack: () => void;
  onCaseClick: (caseId: string) => void;
}

const cases = [
  {
    title: '[EXTERNAL] Re: Successful Transaction...',
    date: '24 Feb 2026, 10:00',
    caseId: '32884592',
    status: 'Resolved',
    statusColor: '#d1fae5',
    textColor: '#065f46',
  },
  {
    title: '[EXTERNAL] Re: Skrill ...',
    date: '12 Jun 2025, 15:07',
    caseId: '32739758',
    status: 'Resolved',
    statusColor: '#d1fae5',
    textColor: '#065f46',
  },
  {
    title: '[EXTERNAL] Re: Regar...',
    date: '01 Apr 2025, 22:44',
    caseId: '32493307',
    status: 'Resolved',
    statusColor: '#d1fae5',
    textColor: '#065f46',
  },
  {
    title: 'Payments',
    subtitle: 'I have a question about the Skrill Money Transfer service',
    date: '15 Mar 2025, 08:44',
    caseId: '32132997',
    status: 'Closed by you',
    statusColor: '#f3f4f6',
    textColor: '#4b5563',
  },
];

export const MyCases: React.FC<MyCasesProps> = ({ onBack, onCaseClick }) => {
  return (
    <div className="bg-white min-h-screen -m-4 p-4 font-sans">
      <div className="flex items-center pt-2">
        <button onClick={onBack} className="text-gray-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">My cases</h1>
      </div>

      <p className="text-gray-500 mt-6 mb-4">We typically respond within 24 hours.</p>

      <div className="space-y-4">
        {cases.map((caseItem, index) => (
          <div key={index} onClick={() => onCaseClick(caseItem.caseId)} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{caseItem.title}</h3>
                {caseItem.subtitle && <p className="text-gray-600">{caseItem.subtitle}</p>}
                <p className="text-sm text-gray-500 mt-1">Case ID: {caseItem.caseId}</p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">{caseItem.date}</span>
            </div>
            <div className="flex justify-end mt-2">
                <span 
                    className="px-2 py-1 text-xs font-medium rounded-full"
                    style={{ backgroundColor: caseItem.statusColor, color: caseItem.textColor }}
                >
                    ● {caseItem.status}
                </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 mt-6">
        What does the <span className="text-skrill-purple">status of your case</span> mean?
      </p>
    </div>
  );
};
