import { Link } from 'wouter';
import { SiFacebook, SiInstagram, SiYoutube, SiPinterest } from 'react-icons/si';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { footerLinks } from '@/lib/mockData';

export default function Footer() {
  return (
    <footer className="bg-card border-t" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-serif text-2xl font-semibold mb-4">AuraHome</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Premium scented candles and home decor to transform your living space into a sanctuary of warmth and comfort.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-youtube"
              >
                <SiYoutube className="w-5 h-5" />
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-pinterest"
              >
                <SiPinterest className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map(link => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      data-testid={`link-footer-${link.name.toLowerCase().replace(' ', '-')}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map(link => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      data-testid={`link-footer-${link.name.toLowerCase().replace(' ', '-')}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive updates, offers, and more.
            </p>
            <form 
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                console.log('Newsletter subscription submitted');
              }}
            >
              <Input 
                type="email" 
                placeholder="Enter email" 
                className="flex-1"
                data-testid="input-newsletter"
              />
              <Button type="submit" data-testid="button-subscribe">
                Join
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            2024 AuraHome. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {footerLinks.policies.map(link => (
              <Link key={link.href} href={link.href}>
                <span 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  data-testid={`link-footer-${link.name.toLowerCase().replace(' ', '-')}`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
