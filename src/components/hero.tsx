'use client';

import React, { useState } from 'react';
import { MultimodalInput } from './multiModal-input';
import { useChat } from '@ai-sdk/react';
import type { ChatMessage, Attachment, VisibilityType } from '@/lib/types';

const Hero = () => {
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedVisibilityType, setSelectedVisibilityType] = useState<VisibilityType>('public');
  const [selectedModelId, setSelectedModelId] = useState('default-model-id');

  const { messages, setMessages, sendMessage, status, stop } = useChat<ChatMessage>({
    api: '/api/chat',
    initialMessages: [],
  });

  const handleVisibilityChange = (newVisibility: VisibilityType) => {
    setSelectedVisibilityType(newVisibility); // Update state in Hero
  };

  return (
    <div className="max-w-[48rem] mx-auto flex flex-col items-center my-52 sm:my-[18rem] gap-12">
      <div>
        <p className="text-primary text-center text-3xl sm:text-4xl md:text-[2.8475rem] font-medium leading-tight tracking-[-1.2px]">
          Build something Amazing
        </p>
        <p className="text-primary/65 text-center text-sm md:text-lg font-normal leading-[1.5625rem]">
          Create apps and websites by chatting with AI
        </p>
      </div>
      <div className="w-full">
        <MultimodalInput
          chatId="chat-123"
          input={input}
          setInput={setInput}
          status={status}
          stop={stop}
          attachments={attachments}
          setAttachments={setAttachments}
          messages={messages}
          setMessages={setMessages}
          sendMessage={sendMessage}
          selectedVisibilityType={selectedVisibilityType}
          selectedModelId={selectedModelId}
          onVisibilityChange={handleVisibilityChange} // Pass the callback
        />
      </div>
    </div>
  );
};

export default Hero;