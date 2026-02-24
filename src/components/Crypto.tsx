import React from 'react';
import { motion } from 'motion/react';
import { Bitcoin, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { CryptoAsset } from '../types';

const assets: CryptoAsset[] = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 64230.50, change24h: 2.4 },
  { id: '2', name: 'Ethereum', symbol: 'ETH', price: 3450.20, change24h: -1.2 },
  { id: '3', name: 'Solana', symbol: 'SOL', price: 145.80, change24h: 5.7 },
  { id: '4', name: 'Cardano', symbol: 'ADA', price: 0.45, change24h: 0.8 },
  { id: '5', name: 'Polkadot', symbol: 'DOT', price: 7.20, change24h: -3.1 },
];

export const Crypto: React.FC = () => {
  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-skrill-purple">Crypto</h1>
        <button className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
          <Search size={20} className="text-gray-400" />
        </button>
      </div>

      <div className="bg-skrill-purple/5 p-4 rounded-3xl border border-skrill-purple/10">
        <div className="flex items-center space-x-3 mb-2">
          <Bitcoin className="text-skrill-purple" />
          <h3 className="font-bold text-skrill-purple">Start Trading</h3>
        </div>
        <p className="text-xs text-gray-600">Buy and sell over 40 cryptocurrencies instantly with your Skrill balance.</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Market Trends</h3>
          <button className="text-skrill-purple text-sm font-semibold">View all</button>
        </div>
        
        <div className="space-y-3">
          {assets.map((asset) => (
            <motion.div
              key={asset.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center font-bold text-gray-700">
                  {asset.symbol.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm">{asset.name}</p>
                  <p className="text-xs text-gray-400">{asset.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">${asset.price.toLocaleString()}</p>
                <div className={`flex items-center justify-end space-x-1 text-xs ${
                  asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {asset.change24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  <span>{Math.abs(asset.change24h)}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
