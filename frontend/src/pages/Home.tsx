
import HeroSection from '@/components/home/HeroSection';
import OverviewSection from '@/components/home/OverviewSection';
import DataVisualizationSection from '@/components/home/DataVisualizationSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import PregnancyTracker3D from '@/components/home/PregnancyTracker3D';

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <HeroSection />
      
      {/* Increase vertical spacing around the pregnancy tracker section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Pregnancy Development Tracker</h2>
          <p className="text-muted-foreground">Watch your baby grow week by week in 3D</p>
        </div>
        <PregnancyTracker3D />
      </div>
      
      <OverviewSection />
      <DataVisualizationSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
};

export default Home;
