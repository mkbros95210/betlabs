import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useUser } from '../lib/auth';
import { Card } from '../../../../packages/ui/Card';

const WalletSummary = () => {
  const { user } = useUser();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchWallet = async () => {
        const { data, error } = await supabase
          .from('wallet')
          .select('balance')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setBalance(data.balance);
        }
        setLoading(false);
      };

      fetchWallet();
    }
  }, [user]);

  return (
    <Card>
      <h3 className="text-lg font-bold">Wallet</h3>
      {loading ? (
        <p>Loading balance...</p>
      ) : (
        <p className="text-2xl font-bold">${balance?.toFixed(2) ?? '0.00'}</p>
      )}
    </Card>
  );
};

export default WalletSummary;
