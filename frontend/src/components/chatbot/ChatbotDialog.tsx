
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizontal, Bot, User } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatbotDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Enhanced sample responses for the AI chatbot
const sampleResponses: Record<string, string> = {
  default: "I'm your pregnancy and nutrition assistant. How can I help you today? You can ask me about safe foods, nutritional needs, or managing pregnancy symptoms.",
  greeting: "Hello! I'm here to answer your pregnancy and nutrition questions. What would you like to know?",
  sushi: "It's generally recommended to avoid raw fish during pregnancy due to the risk of foodborne illness. However, cooked sushi rolls (like california rolls or cooked shrimp) and vegetarian options are safe to eat.",
  iron: "In your second trimester, you need about 27mg of iron daily. Good sources include lean red meat, beans, lentils, spinach, and iron-fortified cereals. Taking iron with vitamin C helps absorption.",
  baby: "When introducing solid foods to your baby (usually around 6 months), good first options include iron-fortified rice cereal, pureed fruits and vegetables, and mashed avocado. Start with one food at a time to watch for allergies.",
  symptoms: "Common pregnancy symptoms include morning sickness, fatigue, food cravings, and mood changes. These are normal, but if you're concerned about any symptoms, please consult your healthcare provider.",
  weight: "Healthy weight gain during pregnancy depends on your pre-pregnancy BMI, but typically ranges from 25-35 pounds for women with a normal BMI. Your doctor can give you personalized guidelines.",
  calcium: "During pregnancy, you need about 1,000mg of calcium daily. Good sources include dairy products, fortified plant milks, tofu, leafy greens like kale, and calcium-fortified foods. If you're deficient, your doctor may recommend supplements.",
  vitaminD: "Vitamin D is crucial during pregnancy, with a recommended intake of 600 IU daily. Sources include sunlight, fatty fish like salmon, fortified dairy and plant milks, and egg yolks. Many prenatal vitamins include vitamin D.",
  folate: "Folate (or folic acid) is essential for preventing neural tube defects. You need about 600-800 mcg daily during pregnancy. Sources include leafy greens, fortified cereals, citrus fruits, beans, and prenatal vitamins.",
  protein: "During pregnancy, protein needs increase to about 75-100g daily. Good sources include lean meats, poultry, fish, eggs, dairy, legumes, nuts, and seeds. Protein supports your baby's growth and your increased blood volume.",
  vegetarian: "A vegetarian diet can be healthy during pregnancy if you ensure adequate protein, iron, calcium, vitamin B12, and omega-3s. Focus on legumes, dairy or fortified plant milks, eggs (if eaten), nuts, seeds, and consider supplements if needed.",
  vegan: "A vegan pregnancy diet requires careful planning. Ensure adequate protein from legumes, nuts and seeds; iron from leafy greens and fortified foods; calcium from fortified plant milks; and supplements for vitamin B12, vitamin D, and possibly DHA.",
  morning: "For morning sickness, try eating small, frequent meals; staying hydrated; consuming ginger; wearing acupressure bands; avoiding triggering smells; eating bland foods; and having crackers before getting out of bed. If severe, consult your doctor.",
  heartburn: "For pregnancy heartburn, eat smaller, more frequent meals; avoid spicy, greasy, or acidic foods; don't lie down after eating; elevate your head when sleeping; wear loose clothing; and avoid carbonated drinks. Approved antacids may help if necessary.",
  cravings: "Pregnancy food cravings are normal and often peak in the second trimester. It's fine to indulge them in moderation as long as they're not harmful (like non-food items, which is called pica). Try to maintain a balanced diet overall.",
  water: "During pregnancy, aim for about 8-10 cups (64-80 oz) of fluids daily, with water being the best choice. Proper hydration prevents UTIs, constipation, and helps form amniotic fluid. Your needs increase especially during the third trimester.",
  dairy: "Dairy products provide calcium, protein, and vitamin D during pregnancy. Choose pasteurized options to avoid listeria risk. If you're lactose intolerant or dairy-free, fortified plant milks, leafy greens, and supplements can help meet nutrient needs.",
  caffeine: "It's generally considered safe to consume up to 200mg of caffeine daily during pregnancy (about one 12oz cup of coffee). Excessive caffeine intake may increase risks of miscarriage and low birth weight, so moderation is key."
};

const getResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return sampleResponses.greeting;
  } else if (lowerMessage.includes('sushi') || lowerMessage.includes('raw fish')) {
    return sampleResponses.sushi;
  } else if (lowerMessage.includes('iron')) {
    return sampleResponses.iron;
  } else if (lowerMessage.includes('baby') && (lowerMessage.includes('food') || lowerMessage.includes('eat'))) {
    return sampleResponses.baby;
  } else if (lowerMessage.includes('symptom')) {
    return sampleResponses.symptoms;
  } else if (lowerMessage.includes('weight') && lowerMessage.includes('gain')) {
    return sampleResponses.weight;
  } else if (lowerMessage.includes('calcium')) {
    return sampleResponses.calcium;
  } else if (lowerMessage.includes('vitamin d') || lowerMessage.includes('vitamin-d')) {
    return sampleResponses.vitaminD;
  } else if (lowerMessage.includes('folate') || lowerMessage.includes('folic acid')) {
    return sampleResponses.folate;
  } else if (lowerMessage.includes('protein')) {
    return sampleResponses.protein;
  } else if (lowerMessage.includes('vegetarian')) {
    return sampleResponses.vegetarian;
  } else if (lowerMessage.includes('vegan')) {
    return sampleResponses.vegan;
  } else if ((lowerMessage.includes('morning') && lowerMessage.includes('sickness')) || lowerMessage.includes('nausea')) {
    return sampleResponses.morning;
  } else if (lowerMessage.includes('heartburn') || lowerMessage.includes('acid reflux')) {
    return sampleResponses.heartburn;
  } else if (lowerMessage.includes('craving')) {
    return sampleResponses.cravings;
  } else if (lowerMessage.includes('water') || lowerMessage.includes('hydration')) {
    return sampleResponses.water;
  } else if (lowerMessage.includes('dairy') || lowerMessage.includes('milk') || lowerMessage.includes('cheese')) {
    return sampleResponses.dairy;
  } else if (lowerMessage.includes('caffeine') || lowerMessage.includes('coffee') || lowerMessage.includes('tea')) {
    return sampleResponses.caffeine;
  } else {
    return "I don't have specific information on that topic yet. As your pregnancy assistant, I can answer questions about nutrition during pregnancy, safe foods, symptoms, and baby's first foods. Try asking about iron, calcium, protein, food safety, or managing pregnancy symptoms.";
  }
};

const ChatbotDialog = ({ isOpen, setIsOpen }: ChatbotDialogProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: sampleResponses.default }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: ChatMessage = { role: 'user', content: inputValue };
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      const aiResponse: ChatMessage = { role: 'assistant', content: getResponse(userMessage.content) };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md md:max-w-lg p-0 h-[600px] flex flex-col">
        <div className="bg-nurture-500 text-white p-4 flex items-center space-x-2 rounded-t-lg">
          <Bot className="h-6 w-6" />
          <DialogTitle className="text-lg font-medium">NurtureMomma Assistant</DialogTitle>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`
                  max-w-[80%] rounded-lg p-3 
                  ${message.role === 'user' 
                    ? 'bg-nurture-500 text-white' 
                    : 'bg-muted border border-nurture-100'
                  }
                `}
              >
                <div className="flex items-start mb-1 space-x-2">
                  {message.role === 'assistant' && <Bot className="h-4 w-4 mt-1" />}
                  {message.role === 'user' && <User className="h-4 w-4 mt-1" />}
                  <span className="text-xs font-medium">
                    {message.role === 'assistant' ? 'NurtureMomma Assistant' : 'You'}
                  </span>
                </div>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask a question about pregnancy or nutrition..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              className="bg-nurture-500 hover:bg-nurture-600"
              disabled={inputValue.trim() === ''}
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Need help? Try asking about safe foods during pregnancy, nutrient requirements, or baby's first foods.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;
