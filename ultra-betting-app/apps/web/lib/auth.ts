import { supabase } from './supabaseClient';
import { User } from '@supabase/supabase-js';

export const useUser = (): { user: User | null } => {
  const session = supabase.auth.getSession();
  const user = session?.user ?? null;
  return { user };
};

export const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { user } = useUser();

    if (!user) {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
