import React from 'react';
import { Card } from '../../../../packages/ui/Card';
import { Button } from '../../../../packages/ui/Button';
import { useRouter } from 'next/router';

interface MatchCardProps {
  match: {
    id: string;
    team_a: string;
    team_b: string;
    match_time: string;
    odds_a: number;
    odds_b: number;
    odds_draw?: number;
  };
}

const MatchCard = ({ match }: MatchCardProps) => {
  const router = useRouter();

  const handleViewMatch = () => {
    router.push(`/match/${match.id}`);
  };

  return (
    <Card className="mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">{match.team_a} vs {match.team_b}</h3>
          <p className="text-sm text-gray-500">{new Date(match.match_time).toLocaleString()}</p>
        </div>
        <div className="flex items-center">
          <div className="text-center mr-4">
            <p className="font-bold">{match.odds_a.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{match.team_a}</p>
          </div>
          {match.odds_draw && (
            <div className="text-center mr-4">
              <p className="font-bold">{match.odds_draw.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Draw</p>
            </div>
          )}
          <div className="text-center mr-4">
            <p className="font-bold">{match.odds_b.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{match.team_b}</p>
          </div>
          <Button onClick={handleViewMatch}>View</Button>
        </div>
      </div>
    </Card>
  );
};

export default MatchCard;
