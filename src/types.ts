export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'deposit' | 'withdraw';
  amount: number;
  currency: string;
  recipient?: string;
  sender?: string;
  date: string;
  status: 'completed' | 'pending' | 'failed' | 'funded';
  fee?: number;
  total?: number;
  transactionNumber?: string;
  bankCard?: string;
  exchangeRate?: string;
  payWith?: string;
  accountNumber?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  customerId: string;
  balance: number;
  currency: string;
  avatar?: string;
}

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}
