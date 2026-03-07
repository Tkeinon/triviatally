import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, BarChart } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default async function HomePage() {
  const t = await getTranslations('HomePage');
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 flex items-center justify-between bg-primary text-primary-foreground shadow-sm">
        <div className="flex items-center gap-2">
          <Trophy className="w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        </div>
        <nav className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button variant="secondary" className="font-semibold">{t('logIn')}</Button>
          <Button variant="outline" className="bg-primary text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold">{t('signUp')}</Button>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center py-20 px-6 max-w-5xl mx-auto w-full gap-16">
        
        <section className="text-center flex flex-col items-center gap-6 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
            {t('hero.titlePart1')} <span className="text-primary">{t('hero.titlePart2')}</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('hero.description')}
          </p>
          <div className="flex gap-4 mt-4">
            <Button size="lg" className="text-lg px-8">{t('hero.getStarted')}</Button>
            <Button size="lg" variant="outline" className="text-lg px-8">{t('hero.learnMore')}</Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Users className="w-12 h-12 text-primary mb-4" />
              <CardTitle className="text-xl">{t('features.teamManagement.title')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              {t('features.teamManagement.description')}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Trophy className="w-12 h-12 text-primary mb-4" />
              <CardTitle className="text-xl">{t('features.liveScoring.title')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              {t('features.liveScoring.description')}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <BarChart className="w-12 h-12 text-primary mb-4" />
              <CardTitle className="text-xl">{t('features.seasonTracking.title')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              {t('features.seasonTracking.description')}
            </CardContent>
          </Card>
        </section>

      </main>

      <footer className="border-t py-6 text-center text-muted-foreground text-sm">
        <p>{t('footer.rights', { year: new Date().getFullYear() })}</p>
      </footer>
    </div>
  );
}
