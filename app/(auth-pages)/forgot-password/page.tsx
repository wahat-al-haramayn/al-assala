import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPasswordAction } from '@/lib/actions/auth.actions';
import Link from 'next/link';

export default async function ForgotPassword(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <div>
          <h1 className="text-2xl font-medium">إعادة التعيين</h1>
          <p className="text-sm text-secondary-foreground">
            لديك حساب؟{' '}
            <Link className="text-primary underline" href="/sign-in">
              تسجيل الدخول
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input dir="ltr" name="email" placeholder="البريد الإلكتروني" required />
          <SubmitButton formAction={forgotPasswordAction}>إعادة التعيين</SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      {/* <SmtpMessage /> */}
    </>
  );
}
