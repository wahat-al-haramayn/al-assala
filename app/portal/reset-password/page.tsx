import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPasswordAction } from '@/lib/actions/auth.actions';

export default async function ResetPassword(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">إعادة تعيين كلمة المرور</h1>
      <p className="text-sm text-foreground/60">يرجى إدخال كلمة المرور الجديدة أدناه.</p>
      <Label htmlFor="password">كلمة المرور الجديدة</Label>
      <Input type="password" name="password" placeholder="كلمة المرور الجديدة" required />
      <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
      <Input type="password" name="confirmPassword" placeholder="تأكيد كلمة المرور" required />
      <SubmitButton formAction={resetPasswordAction}>إعادة تعيين كلمة المرور</SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
