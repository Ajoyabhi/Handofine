import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ShoppingBag, Search, User, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { navLinks } from '@/lib/mockData';

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { setIsOpen: setCartOpen, itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-background border-b" data-testid="header">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 md:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle className="font-serif text-xl">Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-1">
                  {navLinks.map(link => (
                    <Link key={link.href} href={link.href}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${location === link.href ? 'bg-accent' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={`link-nav-mobile-${link.name.toLowerCase().replace(' ', '-')}`}
                      >
                        {link.name}
                      </Button>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/">
            <h1 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight cursor-pointer" data-testid="link-logo">
              HandOFine
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <Button 
                  variant="ghost"
                  className={location === link.href ? 'bg-accent' : ''}
                  data-testid={`link-nav-${link.name.toLowerCase().replace(' ', '-')}`}
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                setSearchOpen(!searchOpen);
                console.log('Search toggled');
              }}
              data-testid="button-search"
            >
              <Search className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              className="hidden md:inline-flex"
              data-testid="button-account"
            >
              <User className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
              data-testid="button-cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge 
                  variant="default" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  data-testid="badge-cart-count"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4" data-testid="search-container">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products..."
                className="w-full h-10 pl-10 pr-4 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
                data-testid="input-search"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
