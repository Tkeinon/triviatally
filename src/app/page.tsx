import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-xl text-muted-foreground">{t('description')}</p>
    </div>
  );
}