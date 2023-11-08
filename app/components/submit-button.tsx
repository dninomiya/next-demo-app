'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import React from 'react';
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
      {children}
    </Button>
  );
}
