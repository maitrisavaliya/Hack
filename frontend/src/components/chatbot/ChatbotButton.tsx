
import { useState } from 'react';
import { Bot, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatbotDialog from './ChatbotDialog';

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-nurture-500 hover:bg-nurture-600 flex items-center justify-center p-0 z-50"
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Bot className="h-6 w-6 text-white" />
        )}
      </Button>

      <ChatbotDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ChatbotButton;
