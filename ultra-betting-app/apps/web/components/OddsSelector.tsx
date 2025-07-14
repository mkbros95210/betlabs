import React from 'react';
import { Card } from '../../../../packages/ui/Card';
import { Button } from '../../../../packages/ui/Button';

interface OddsSelectorProps {
  match: {
    id: string;
    team_a: string;
    team_b: string;
    odds_a: number;
    odds_b: number;
    odds_draw?: number;
  };
}

const OddsSelector = ({ match }: OddsSelectorProps) => {
  const handleSelectBet = (bet: string, odds: number) => {
    // This would typically add the bet to the bet slip
    console.log(`Selected bet: ${bet} with odds: ${odds}`);
  };

  return (
    <Card>
      <h3 className="text-xl font-bold mb-4">Place Your Bet</h3>
      <div className="flex justify-around">
        <Button onClick={() => handleSelectBet(match.team_a, match.odds_a)}>
          <span className="font-bold">{match.team_a}</span>
          <span className="ml-2">{match.odds_a.toFixed(2)}</span>
        </Button>
        {match.odds_draw && (
          <Button onClick={() => handleSelectBet('Draw', match.odds_draw!)}>
            <span className="font-bold">Draw</span>
            <span className="ml-2">{match.odds_draw.toFixed(2)}</span>
          </Button>
        )}
        <Button onClick={() => handleSelectBet(match.team_b, match.odds_b)}>
          <span className="font-bold">{match.team_b}</span>
          <span className="ml-2">{match.odds_b.toFixed(2)}</span>
        </Button>
      </div>
    </Card>
  );
};

export default OddsSelector;
