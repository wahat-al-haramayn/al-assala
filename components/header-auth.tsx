import { signOutAction } from "@/lib/actions/auth.actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

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
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">تسجيل الدخول</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">اشترك</Link>
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
        <span className="font-bold text-lg mr-1">
          {user.user_metadata.displayName}
        </span>
      </div>
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          تسجيل الخروج
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">تسجيل الدخول</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">اشترك</Link>
      </Button>
    </div>
  );
}
