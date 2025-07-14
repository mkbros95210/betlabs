import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Card } from '../../../../packages/ui/Card';
import { useRouter } from 'next/router';

const VerifyPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { token } = router.query;

    if (token) {
      const verifyToken = async () => {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token as string,
          type: 'email',
        });

        if (error) {
          setError(error.message);
        } else {
          // Redirect to the login page after successful verification
          router.push('/auth/login');
        }
        setLoading(false);
      };
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Verifying your account</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <p>
            You have been successfully verified. You can now log in.
          </p>
        )}
      </Card>
    </div>
  );
};

export default VerifyPage;
