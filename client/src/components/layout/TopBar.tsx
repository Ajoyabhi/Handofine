import { SiFacebook, SiInstagram, SiYoutube, SiPinterest } from 'react-icons/si';

interface TopBarProps {
  message?: string;
}

export default function TopBar({ message = "Free shipping on orders above Rs. 999!" }: TopBarProps) {
  return (
    <div className="bg-primary text-primary-foreground" data-testid="top-bar">
      <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between gap-4">
        <div className="hidden md:flex items-center gap-3">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition-opacity"
            data-testid="link-facebook"
            aria-label="Facebook"
          >
            <SiFacebook className="w-4 h-4" />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition-opacity"
            data-testid="link-instagram"
            aria-label="Instagram"
          >
            <SiInstagram className="w-4 h-4" />
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition-opacity"
            data-testid="link-youtube"
            aria-label="YouTube"
          >
            <SiYoutube className="w-4 h-4" />
          </a>
          <a 
            href="https://pinterest.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition-opacity"
            data-testid="link-pinterest"
            aria-label="Pinterest"
          >
            <SiPinterest className="w-4 h-4" />
          </a>
        </div>
        <p className="text-sm font-medium text-center flex-1 md:flex-none" data-testid="text-promo-message">
          {message}
        </p>
        <div className="hidden md:block w-20" />
      </div>
    </div>
  );
}
