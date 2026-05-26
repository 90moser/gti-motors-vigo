import { Toaster } from 'sonner';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Stats } from '@/components/Stats';
import { Reviews } from '@/components/Reviews';
import { Booking } from '@/components/Booking';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster theme="dark" position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Stats />
        <Reviews />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
