import { signOutAction } from '@/lib/actions/auth.actions';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import { createClient } from '@/utils/supabase/server';
import { LogInIcon, LogOutIcon, UserPlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={'outline'}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">
                <LogInIcon className="w-4 h-4 ml-2" />
                تسجيل الدخول
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={'default'}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">
                <UserPlusIcon className="w-4 h-4 ml-2" />
                اشترك
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <div className="flex items-center gap-4">
      <div>
        مرحباً,
        <span className="font-bold mr-1">{user.user_metadata.displayName}</span>
      </div>
      <form action={signOutAction}>
        <Button type="submit" variant={'outline'}>
          <LogOutIcon className="w-4 h-4 ml-2" />
          تسجيل الخروج
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={'outline'}>
        <Link href="/sign-in">
          <LogInIcon className="w-4 h-4 ml-2" />
          تسجيل الدخول
        </Link>
      </Button>
      <Button asChild size="sm" variant={'default'}>
        <Link href="/sign-up">
          <UserPlusIcon className="w-4 h-4 ml-2" />
          اشترك
        </Link>
      </Button>
    </div>
  );
}
