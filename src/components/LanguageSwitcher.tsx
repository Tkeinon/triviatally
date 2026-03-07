'use client';

import { useTransition } from 'react';
import { setUserLocale } from '@/lib/locale';
import { Button } from './ui/button';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'fi' : 'en';
    startTransition(async () => {
      await setUserLocale(nextLocale);
    });
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLocale}
      disabled={isPending}
      className="text-xs font-bold uppercase tracking-widest"
    >
      {locale === 'en' ? 'FI' : 'EN'}
    </Button>
  );
}
