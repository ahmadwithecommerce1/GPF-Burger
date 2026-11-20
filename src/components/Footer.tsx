import { useState, type FormEvent } from 'react';
import {
  Check,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Send,
  Twitter,
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer
      id="contact"
      className="bg-[#111113] text-zinc-300 border-t border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#home"
              className="inline-block font-display font-black italic text-3xl tracking-tight text-[#E31E24]"
            >
              Fastos
            </a>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Char-grilled beef burgers, crispy buttermilk chicken, and golden seasoned fries crafted fresh from our chef&apos;s kitchen.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="#home"
                aria-label="Fastos Instagram"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#FF6B00] hover:text-[#FF6B00] inline-flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#home"
                aria-label="Fastos Facebook"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#FF6B00] hover:text-[#FF6B00] inline-flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#home"
                aria-label="Fastos Twitter"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#FF6B00] hover:text-[#FF6B00] inline-flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-[#FF6B00] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#FF6B00] transition-colors">
                  Choose &amp; Enjoy
                </a>
              </li>
              <li>
                <a href="#promo" className="hover:text-[#FF6B00] transition-colors">
                  Chef Specials
                </a>
              </li>
              <li>
                <a href="#popular" className="hover:text-[#FF6B00] transition-colors">
                  Popular Burgers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Contact Info
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF6B00] mt-0.5 shrink-0" aria-hidden="true" />
                <span>248 Grillhouse Ave, Downtown District</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E31E24] shrink-0" aria-hidden="true" />
                <a
                  href="tel:+15553924180"
                  className="hover:text-white transition-colors tabular-nums"
                >
                  +1 (555) 392-4180
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#FF6B00] shrink-0" aria-hidden="true" />
                <span>Open Daily · 11:00 AM – 11:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-sm text-zinc-400">
              Get weekend burger drops and free fries vouchers straight to your inbox.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/70 text-emerald-300 text-xs font-semibold">
                <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Subscribed. Check your inbox for your welcome offer.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <label htmlFor="fastos-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="fastos-newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to Fastos newsletter"
                  className="px-4 py-2.5 rounded-lg bg-[#E31E24] hover:bg-[#c5171c] text-white font-semibold text-sm inline-flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Fastos Kitchen. All rights reserved.</p>
          <p>Grilled Fresh · Delivered Hot</p>
        </div>
      </div>
    </footer>
  );
}
