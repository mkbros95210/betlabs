import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useUser, withAuth } from '../../lib/auth';
import { Card } from '../../../../../packages/ui/Card';
import { Button } from '../../../../../packages/ui/Button';

const WalletPage = () => {
  const { user } = useUser();
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchWalletData = async () => {
        // Fetch wallet balance
        const { data: walletData, error: walletError } = await supabase
          .from('wallet')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (walletData) setWallet(walletData);

        // Fetch transactions (e.g., from bets table)
        const { data: transactionData, error: transactionError } = await supabase
          .from('bets')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (transactionData) setTransactions(transactionData);

        setLoading(false);
      };

      fetchWalletData();
    }
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Wallet</h1>
      {loading ? (
        <p>Loading wallet...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <h2 className="text-xl font-bold mb-2">Balance</h2>
              <p className="text-3xl font-bold">${wallet?.balance.toFixed(2) ?? '0.00'}</p>
              <div className="mt-4 flex space-x-2">
                <Button>Deposit</Button>
                <Button>Withdraw</Button>
              </div>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card>
              <h2 className="text-xl font-bold mb-4">Transaction History</h2>
              {transactions.length > 0 ? (
                <ul>
                  {transactions.map((tx) => (
                    <li key={tx.id} className="border-b py-2">
                      <p>Bet on {tx.bet_on} for ${tx.amount.toFixed(2)}</p>
                      <p className={`text-sm ${tx.status === 'won' ? 'text-green-500' : tx.status === 'lost' ? 'text-red-500' : 'text-gray-500'}`}>
                        Status: {tx.status}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No transactions yet.</p>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(WalletPage);
