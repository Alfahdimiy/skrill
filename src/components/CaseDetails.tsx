import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface CaseDetailsProps {
  onBack: () => void;
}

export const CaseDetails: React.FC<CaseDetailsProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen -m-4 p-4 font-sans">
      <div className="flex items-center pt-2 border-b pb-4">
        <button onClick={onBack} className="text-gray-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 ml-4 truncate">[EXTERNAL] Re: Successful Transaction...</h1>
      </div>

      <div className="flex justify-between items-center mt-4 mb-4">
        <p className="text-gray-500">Case ID: 32884592</p>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#d1fae5] text-[#065f46]">
            ● Resolved
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
              <p className="font-bold">Aliyu Isa Aliyu</p>
              <p className="text-sm text-gray-500">24 Feb 2026, 10:00</p>
          </div>
          <div className="text-gray-800">
            Hello, I would like to confirm that the transaction of 4818.95 USD to محمود ناجح رزق محمد حسن was successful. The amount was 19,999 SAR. Can you please provide the details?
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
              <p className="font-bold">Skrill Support Team</p>
              <p className="text-sm text-gray-500">24 Feb 2026, 10:30</p>
          </div>
          <div className="text-gray-800 space-y-2">
            <p>Dear Aliyu Isa Aliyu,</p>
            <p>We are happy to confirm that your transaction was successful. The details of the transfer are as follows:</p>
            <p>
                * Sender: Aliyu Isa Aliyu <br/>
                * You Sent: 4818.95 USD <br/>
                * They Received: 19,999 SAR <br/>
                * Beneficiary Name: محمود ناجح رزق محمد حسن <br/>
                * Transaction Number: 6861168712 <br/>
                * Bank Card: SA9680000857608010251326 <br/>
                * Bank Name: Al rajhi bank <br/>
                * Date: 24 Feb 2026
            </p>
            <p>If you have any other questions, feel free to ask.</p>
            <p>Regards, <br/> Skrill Support Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};
