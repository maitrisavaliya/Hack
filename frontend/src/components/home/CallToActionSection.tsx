
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToActionSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-nurture-500 to-mom-500 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Start Your Nurturing Journey?</h2>
              <p className="text-white/90 text-lg mb-8">
                Join thousands of mothers who are using NurtureMomma to navigate pregnancy and early childhood with confidence.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-white text-nurture-600 hover:bg-nurture-50">
                  Create Your Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1571201017009-355cc7d12603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Mother with baby" 
                className="w-full h-auto object-cover md:h-full"
                style={{ minHeight: '300px', objectPosition: 'center' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
