
import { Calendar, Apple, Bot, Users, Droplet, Hospital } from 'lucide-react';

const features = [
  {
    icon: <Calendar className="h-8 w-8 text-nurture-500" />,
    title: "Pregnancy Tracking",
    description: "Follow your journey with weekly updates on your baby's development and your health."
  },
  {
    icon: <Apple className="h-8 w-8 text-mom-500" />,
    title: "Meal Logging",
    description: "Track your daily nutrition intake to ensure you and your baby get essential nutrients."
  },
  {
    icon: <Bot className="h-8 w-8 text-nurture-500" />,
    title: "AI Chatbot Support",
    description: "Get instant answers to your pregnancy and nutrition questions anytime."
  },
  {
    icon: <Users className="h-8 w-8 text-mom-500" />,
    title: "Mom's Community",
    description: "Connect with other mothers to share experiences and get advice."
  },
  {
    icon: <Hospital className="h-8 w-8 text-nurture-500" />,
    title: "Local Food Resources",
    description: "Find pregnancy-safe food options and resources in your area."
  },
  {
    icon: <Droplet className="h-8 w-8 text-mom-500" />,
    title: "Health Data Tracking",
    description: "Monitor your health metrics throughout pregnancy and your child's growth."
  }
];

const OverviewSection = () => {
  return (
    <section className="py-16 md:py-24 gradient-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Supporting Your Maternal Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            NurtureMomma provides tools and resources to help you navigate pregnancy and early childhood with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
