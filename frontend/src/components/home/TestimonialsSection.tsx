
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "NurtureMomma has been my guiding light through pregnancy. The nutrition tracking helped me ensure I was getting all the right nutrients for my baby.",
    name: "Emma Thompson",
    role: "First-time Mom",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    quote: "The community support is incredible. I've found answers to questions I didn't even know I had, and made friends with moms going through the same journey.",
    name: "Sophia Rodriguez",
    role: "Mom of Two",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    quote: "As a nutritionist, I recommend NurtureMomma to all my pregnant clients. The meal tracking and personalized recommendations are based on solid science.",
    name: "Dr. Jessica Wu",
    role: "Nutritionist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 gradient-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hear From Our Community</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from mothers who have used NurtureMomma on their journey.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-xl p-8 md:p-10 shadow-lg">
            <div className="absolute -top-5 left-10 w-10 h-10 flex items-center justify-center rounded-full bg-nurture-500 text-white">
              <Quote className="h-5 w-5" />
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-nurture-100" 
                />
              </div>
              
              <div>
                <blockquote className="text-lg md:text-xl italic mb-4">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div className="font-semibold">{testimonials[currentIndex].name}</div>
                <div className="text-muted-foreground">{testimonials[currentIndex].role}</div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-4">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-nurture-100 hover:bg-nurture-200 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 text-nurture-700" />
              </button>
              
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-nurture-100 hover:bg-nurture-200 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 text-nurture-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
