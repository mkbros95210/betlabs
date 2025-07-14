import React, { useState, useEffect } from 'react';
import { Card } from '../../../../packages/ui/Card';
import { supabase } from '../lib/supabaseClient';

interface MatchStatsProps {
  matchId: string;
}

const MatchStats = ({ matchId }: MatchStatsProps) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch stats from a dedicated stats table or API
    // For now, we'll just simulate some stats
    const fetchStats = async () => {
      // Example: Fetching from a hypothetical 'match_stats' table
      // const { data, error } = await supabase
      //   .from('match_stats')
      //   .select('*')
      //   .eq('match_id', matchId)
      //   .single();
      // if (data) setStats(data);
      setStats({
        possession_a: 55,
        possession_b: 45,
        shots_a: 12,
        shots_b: 8,
        shots_on_target_a: 5,
        shots_on_target_b: 3,
      });
      setLoading(false);
    };

    fetchStats();
  }, [matchId]);

  return (
    <Card className="mb-6">
      <h3 className="text-xl font-bold mb-4">Match Statistics</h3>
      {loading ? (
        <p>Loading stats...</p>
      ) : stats ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Possession: {stats.possession_a}% - {stats.possession_b}%</p>
            <p>Shots: {stats.shots_a} - {stats.shots_b}</p>
            <p>Shots on Target: {stats.shots_on_target_a} - {stats.shots_on_target_b}</p>
          </div>
        </div>
      ) : (
        <p>No stats available for this match.</p>
      )}
    </Card>
  );
};

export default MatchStats;
