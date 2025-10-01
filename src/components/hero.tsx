"use client";

import { HeroCard } from './hero/index';

const Hero = () => {
  const handleSend = (input: string, attachments: any[], visibility: string) => {
    console.log('Sending message:', { input, attachments, visibility });
    // TODO: Implement actual send logic using chatService
  };

  const handleVoice = () => {
    console.log('Voice input triggered');
    // TODO: Implement voice input logic
  };

  const handleSupabase = () => {
    console.log('Supabase integration triggered');
    // TODO: Implement Supabase integration
  };

  return (
    <div className="max-w-[48rem] mx-auto flex flex-col items-center my-52 sm:my-[18rem] gap-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-primary text-center text-3xl sm:text-4xl md:text-[2.8475rem] font-medium leading-tight tracking-[-1.2px]">
          Build something Amazing
        </h1>
        <p className="text-primary/65 text-center text-sm md:text-lg font-normal leading-[1.5625rem]">
          Create apps and websites by chatting with AI
        </p>
      </div>
      <div className="w-full">
        <HeroCard
          onSend={handleSend}
          onVoice={handleVoice}
          onSupabase={handleSupabase}
        />
      </div>
      
      
    </div>
  );
};

export default Hero;