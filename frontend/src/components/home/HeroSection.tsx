
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-nurture-100 blur-3xl opacity-50"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-mom-100 blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="gradient-text">Nurturing</span> Mothers
              <br />
              <span className="gradient-text">Nourishing</span> Babies
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Your personalized guide to optimal nutrition during pregnancy and early childhood. Track progress, get meal plans, and connect with other moms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-nurture-500 hover:bg-nurture-600">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/community">
                <Button size="lg" variant="outline" className="border-nurture-300 text-nurture-800">
                  Join The Community
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-nurture-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-mom-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float" style={{ animationDelay: '1s' }}></div>
              <img 
                src="https://images.unsplash.com/photo-1538935732373-f7a495fea3f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Happy pregnant woman" 
                className="relative z-10 rounded-2xl shadow-lg object-cover w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
