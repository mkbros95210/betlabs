import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import MatchCard from '../components/MatchCard';
import { withAuth } from '../lib/auth';

const HomePage = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .eq('status', 'scheduled')
        .order('match_time', { ascending: true });

      if (error) {
        setError(error.message);
      } else {
        setMatches(data);
      }
      setLoading(false);
    };

    fetchMatches();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Upcoming Matches</h1>
      {loading && <p>Loading matches...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default withAuth(HomePage);
