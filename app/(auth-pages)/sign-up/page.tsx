import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpAction } from '@/lib/actions/auth.actions';
import Link from 'next/link';

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  if ('message' in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">اشترك</h1>
        <p className="text-sm text text-foreground">
          لديك حساب بالفعل؟{' '}
          <Link className="text-primary font-medium underline" href="/sign-in">
            تسجيل الدخول
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="displayName">الاسم</Label>
          <Input name="displayName" placeholder="الاسم" required />
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input dir="ltr" name="email" placeholder="البريد الإلكتروني" required />
          <Label htmlFor="password">كلمة المرور</Label>
          <Input dir="ltr" type="password" name="password" placeholder="كلمة المرور" minLength={6} required />
          <SubmitButton formAction={signUpAction} pendingText="جارٍ التسجيل...">
            اشترك
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      {/* <SmtpMessage /> */}
    </>
  );
}
