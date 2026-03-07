import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, BarChart } from 'lucide-react';

export default function HomePage() {
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 flex items-center justify-between bg-primary text-primary-foreground shadow-sm">
        <div className="flex items-center gap-2">
          <Trophy className="w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight">Triviatally!</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="secondary" className="font-semibold">Log In</Button>
          <Button variant="outline" className="bg-primary text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold">Sign Up</Button>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center py-20 px-6 max-w-5xl mx-auto w-full gap-16">
        
        <section className="text-center flex flex-col items-center gap-6 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Professional Pub Quiz <span className="text-primary">Management System</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Elevate your trivia nights with seamless team management, live scoring, and comprehensive season tracking. Designed for hosts who want to focus on the fun, not the spreadsheet.
          </p>
          <div className="flex gap-4 mt-4">
            <Button size="lg" className="text-lg px-8">Get Started</Button>
            <Button size="lg" variant="outline" className="text-lg px-8">Learn More</Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Users className="w-12 h-12 text-primary mb-4" />
              <CardTitle className="text-xl">Team Management</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Easily create, join, and manage trivia teams. Keep track of rosters and team history.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Trophy className="w-12 h-12 text-primary mb-4" />
              <CardTitle className="text-xl">Live Scoring</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Input scores on the fly with our dynamic grid system. Supports custom rounds and penalties.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <BarChart className="w-12 h-12 text-primary mb-4" />
              <CardTitle className="text-xl">Season Tracking</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Run ongoing seasons, track cumulative scores, and crown the ultimate trivia champions.
            </CardContent>
          </Card>
        </section>

      </main>

      <footer className="border-t py-6 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} Trivitally. All rights reserved.</p>
      </footer>
    </div>
  );
}
