"use client";

import { HeroCard } from './hero/index';
import { chatService } from '@/services/chatService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Hero = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSend = async (input: string, attachments: any[], visibility: string) => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      console.log('Sending message:', { input, attachments, visibility });

      const response = await chatService.sendAIChat({
        message: input
      });

      console.log('AI Chat Response:', response);

      if (response.success && response.data.success) {
        // If this is a new project creation, redirect to project page
        if (response.data.projectId && !response.data.messageId) {
          console.log('Redirecting to new project:', response.data.projectId);
          router.push(`/projects/${response.data.projectId}`);
        } else {
          // If this is a continuation of existing project, redirect to project page
          if (response.data.projectId) {
            console.log('Redirecting to existing project:', response.data.projectId);
            router.push(`/projects/${response.data.projectId}`);
          }
        }
      } else {
        console.error('API returned unsuccessful response:', response);
        // TODO: Show error toast/notification
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error sending message:', error);

      // Show user-friendly error message based on error type
      if (error.message?.includes('timeout')) {
        console.error('Request timed out. The server is taking too long to respond.');
      } else if (error.message?.includes('Unable to connect')) {
        console.error('Unable to connect to the server. Please check your connection.');
      } else if (error.response?.status === 404) {
        console.error('API endpoint not found. Please check if the server is running.');
      } else if (error.response?.status >= 500) {
        console.error('Server error. Please try again later.');
      } else {
        console.error('Network error. Please check your connection.');
      }

      // TODO: Show error toast/notification
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
        />
        {isLoading && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              Processing your request... (This may take up to 5 minutes)
            </div>
          </div>
        )}
      </div>
      
      
    </div>
  );
};

export default Hero;