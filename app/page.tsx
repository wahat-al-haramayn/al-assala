import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Home from './(home)';

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.user_metadata.isAdmin) {
    return redirect('/portal');
  }

  return <Home />;
}
