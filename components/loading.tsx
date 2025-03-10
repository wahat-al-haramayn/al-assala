import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

export default function Loading({ className }: { className?: string }) {
  return <LoaderCircle className={cn('animate-spin', className)} />;
}
