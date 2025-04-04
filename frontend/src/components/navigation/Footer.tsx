
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted mt-12 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-mom-500" />
              <span className="text-2xl font-bold gradient-text">NurtureMomma</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Supporting mothers and children with personalized nutrition guidance, health tracking, and community support.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-nurture-600">Home</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-nurture-600">Dashboard</Link></li>
              <li><Link to="/community" className="text-muted-foreground hover:text-nurture-600">Community</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-nurture-600">Blog</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-nurture-600">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-muted-foreground hover:text-nurture-600">Help Center</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-nurture-600">FAQs</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-nurture-600">Privacy Policy</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-nurture-600">Terms of Service</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-nurture-600">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-4">
              <p className="flex items-center text-muted-foreground">
                <Mail className="h-5 w-5 mr-2" />
                support@nurturemomma.com
              </p>
              <p className="flex items-center text-muted-foreground">
                <Phone className="h-5 w-5 mr-2" />
                (555) 123-4567
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-muted-foreground hover:text-nurture-600">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-nurture-600">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-nurture-600">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-nurture-100 mt-8 pt-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NurtureMomma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
