import React, { useState } from 'react';
import { Card } from '../../../../packages/ui/Card';
import { Button } from '../../../../packages/ui/Button';

interface Bet {
  matchId: string;
  betOn: string;
  odds: number;
}

const BetSlip = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [stake, setStake] = useState<number>(0);

  const handlePlaceBet = () => {
    // In a real app, this would call the Supabase API to place the bet
    console.log(`Placing bet with stake: ${stake}`, bets);
  };

  const totalOdds = bets.reduce((acc, bet) => acc * bet.odds, 1);
  const potentialPayout = stake * totalOdds;

  // In a real app, you would have a global state management (like Zustand or Redux)
  // to add bets to the slip from the OddsSelector component.
  // For now, we'll simulate adding a bet.
  const addBet = (bet: Bet) => {
    setBets((prevBets) => [...prevBets, bet]);
  };

  return (
    <Card>
      <h3 className="text-xl font-bold mb-4">Bet Slip</h3>
      {bets.length === 0 ? (
        <p>Your bet slip is empty.</p>
      ) : (
        <div>
          {bets.map((bet, index) => (
            <div key={index} className="mb-2">
              <p className="font-bold">{bet.betOn}</p>
              <p className="text-sm">Odds: {bet.odds.toFixed(2)}</p>
            </div>
          ))}
          <div className="mt-4">
            <label className="block text-sm font-bold mb-2" htmlFor="stake">
              Stake
            </label>
            <input
              id="stake"
              type="number"
              value={stake}
              onChange={(e) => setStake(parseFloat(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mt-4">
            <p>Total Odds: {totalOdds.toFixed(2)}</p>
            <p>Potential Payout: ${potentialPayout.toFixed(2)}</p>
          </div>
          <Button onClick={handlePlaceBet} className="mt-4 w-full">
            Place Bet
          </Button>
        </div>
      )}
    </Card>
  );
};

export default BetSlip;
