import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import { withAuth } from '../../lib/auth';
import OddsSelector from '../../components/OddsSelector';
import MatchStats from '../../components/MatchStats';
import BetSlip from '../../components/BetSlip';

const MatchPage = () => {
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchMatch = async () => {
        const { data, error } = await supabase
          .from('matches')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          setError(error.message);
        } else {
          setMatch(data);
        }
        setLoading(false);
      };

      fetchMatch();
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p>Loading match details...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {match && (
        <div>
          <h1 className="text-3xl font-bold mb-2">{match.team_a} vs {match.team_b}</h1>
          <p className="text-sm text-gray-500 mb-6">{new Date(match.match_time).toLocaleString()}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <MatchStats matchId={match.id} />
              <OddsSelector match={match} />
            </div>
            <div>
              <BetSlip />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(MatchPage);
