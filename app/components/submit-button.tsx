'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({
  children,
  ...props
}: {
  children: React.ReactNode;
} & ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={pending}>
      {pending && <Loader size={18} className="mr-2 animate-spin" />}
      {children}
    </Button>
  );
}
