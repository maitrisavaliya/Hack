
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, Baby } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-nurture-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-mom-500" />
            <span className="text-2xl font-bold gradient-text">NurtureMomma</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-nurture-600 font-medium">Home</Link>
            <Link to="/dashboard" className="text-foreground hover:text-nurture-600 font-medium">Dashboard</Link>
            <Link to="/community" className="text-foreground hover:text-nurture-600 font-medium">Community</Link>
            <Link to="/blog" className="text-foreground hover:text-nurture-600 font-medium">Blog</Link>
            <Link to="/resources" className="text-foreground hover:text-nurture-600 font-medium">Resources</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/register">
              <Button className="bg-nurture-500 hover:bg-nurture-600">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link to="/" className="block py-2 text-foreground hover:text-nurture-600 font-medium" onClick={toggleMenu}>Home</Link>
            <Link to="/dashboard" className="block py-2 text-foreground hover:text-nurture-600 font-medium" onClick={toggleMenu}>Dashboard</Link>
            <Link to="/community" className="block py-2 text-foreground hover:text-nurture-600 font-medium" onClick={toggleMenu}>Community</Link>
            <Link to="/blog" className="block py-2 text-foreground hover:text-nurture-600 font-medium" onClick={toggleMenu}>Blog</Link>
            <Link to="/resources" className="block py-2 text-foreground hover:text-nurture-600 font-medium" onClick={toggleMenu}>Resources</Link>
            <Link to="/register" onClick={toggleMenu}>
              <Button className="w-full bg-nurture-500 hover:bg-nurture-600">Get Started</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
