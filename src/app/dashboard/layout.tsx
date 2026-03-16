import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { Trophy, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const t = await getTranslations('Dashboard');

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <Link href="/dashboard" className="font-bold tracking-tight text-xl">
              TriviaTally
            </Link>
          </div>
          
          <div className="flex flex-1 items-center justify-end space-x-4">
            <LanguageSwitcher />
            
            <form action={async () => {
              "use server";
              await signOut({ redirectTo: '/auth/login' });
            }}>
              <Button variant="ghost" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline-block">{t('logout')}</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-4 sm:px-8 py-8">
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pr-6 lg:py-8">
            <nav className="flex w-full flex-col gap-2">
              <Link href="/dashboard" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-muted text-primary">
                {t('title')}
              </Link>
              <Link href="/dashboard/teams" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                {t('teams')}
              </Link>
              <Link href="/dashboard/seasons" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                {t('seasons')}
              </Link>
            </nav>
          </div>
        </aside>
        
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
