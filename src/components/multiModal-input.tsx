'use client';

import type { UIMessage } from 'ai';
import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
  type ChangeEvent,
  memo,
} from 'react';
import { toast } from 'sonner';
import { useLocalStorage, useWindowSize } from 'usehooks-ts';

import { ArrowUpIcon, PaperclipIcon, SoundIcon, StopIcon, SupabaseIcon, WorldIcon } from './icons';
import { PreviewAttachment } from './preview-attachment';
// import { SuggestedActions } from './suggested-actions';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputSubmit,
  PromptInputModelSelect,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectContent,
} from './elements/prompt-input';
import { SelectItem, SelectValue } from '@/components/ui/select';
import equal from 'fast-deep-equal';
import type { UseChatHelpers } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, Building, Database, Figma, FileImage, GlobeIcon, Image, MicIcon, Plus, PowerIcon, Search } from 'lucide-react';
import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';
import type { VisibilityType, Attachment, ChatMessage } from '@/lib/types';
import { chatModels } from '@/lib/ai/models';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { cn } from '@/lib/utils'; // Assuming cn is available for className utility

interface VisibilityButtonProps {
  selectedVisibilityType: VisibilityType;
  onVisibilityChange: (value: VisibilityType) => void;
}

interface MultimodalInputProps {
  chatId: string;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  status: UseChatHelpers<ChatMessage>['status'];
  stop: () => void;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  messages: Array<ChatMessage>;
  setMessages: UseChatHelpers<ChatMessage>['setMessages'];
  sendMessage: UseChatHelpers<ChatMessage>['sendMessage'];
  className?: string;
  selectedVisibilityType: VisibilityType;
  selectedModelId: string;
  onVisibilityChange: (value: VisibilityType) => void; // Added prop
}

function PureMultimodalInput({
  chatId,
  input,
  setInput,
  status,
  stop,
  attachments,
  setAttachments,
  messages,
  setMessages,
  sendMessage,
  className,
  selectedVisibilityType,
  selectedModelId,
  onVisibilityChange, // Added prop
}: MultimodalInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Added state for dialog

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '72px';
    }
  };

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '72px';
    }
  };

  const [localStorageInput, setLocalStorageInput] = useLocalStorage('input', '');

  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      // Prefer DOM value over localStorage to handle hydration
      const finalValue = domValue || localStorageInput || '';
      //   setInput(finalValue!);
      adjustHeight();
    }
    // Only run once after hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalStorageInput(input);
  }, [input, setLocalStorageInput]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const submitForm = useCallback(() => {
    window.history.replaceState({}, '', `/chat/${chatId}`);

    sendMessage({
      role: 'user',
      parts: [
        ...attachments.map((attachment) => ({
          type: 'file' as const,
          url: attachment.url,
          name: attachment.name,
          mediaType: attachment.contentType,
        })),
        {
          type: 'text',
          text: input,
        },
      ],
    });

    setAttachments([]);
    setLocalStorageInput('');
    resetHeight();
    setInput('');

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [
    input,
    setInput,
    attachments,
    sendMessage,
    setAttachments,
    setLocalStorageInput,
    width,
    chatId,
  ]);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    console.log("Uploading file:", formData);

    try {
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { url, pathname, contentType } = data;

        return {
          url,
          name: pathname,
          contentType: contentType,
        };
      }
      const { error } = await response.json();
      toast.error(error);
    } catch (error) {
      toast.error('Failed to upload file, please try again!');
    }
  };

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);

      setUploadQueue(files.map((file) => file.name));

      try {
        const uploadPromises = files.map((file) => uploadFile(file));
        const uploadedAttachments = await Promise.all(uploadPromises);
        const successfullyUploadedAttachments = uploadedAttachments.filter(
          (attachment) => attachment !== undefined,
        );

        setAttachments((currentAttachments) => [
          ...currentAttachments,
          ...successfullyUploadedAttachments,
        ]);
      } catch (error) {
        console.error('Error uploading files!', error);
      } finally {
        setUploadQueue([]);
      }
    },
    [setAttachments],
  );

  const { isAtBottom, scrollToBottom } = useScrollToBottom();

  useEffect(() => {
    if (status === 'submitted') {
      scrollToBottom();
    }
  }, [status, scrollToBottom]);

  return (
    <div className="flex relative flex-col gap-4 w-full">
      {/* <AnimatePresence>
        {!isAtBottom && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute bottom-28 left-1/2 z-50 -translate-x-1/2"
          >
            <Button
              data-testid="scroll-to-bottom-button"
              className="rounded-full"
              size="icon"
              variant="outline"
              onClick={(event) => {
                event.preventDefault();
                scrollToBottom();
              }}
            >
              <ArrowDown />
            </Button>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* {messages.length === 0 &&
        attachments.length === 0 &&
        uploadQueue.length === 0 && (
          <SuggestedActions
            sendMessage={sendMessage}
            chatId={chatId}
            selectedVisibilityType={selectedVisibilityType}
          />
        )} */}

      <input
        type="file"
        className="fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none"
        ref={fileInputRef}
        multiple
        onChange={handleFileChange}
        tabIndex={-1}
      />

      <PromptInput
        className="bg-accent text-secondary dark:text-muted rounded-[1.75rem] border border-primary/20 shadow-[0px_8px_10px_-6px_#0000001A] transition-all duration-200 dark:bg-sidebar dark:border-sidebar-border p-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (status !== 'ready') {
            toast.error('Please wait for the model to finish its response!');
          } else {
            submitForm();
          }
        }}
      >
        {(attachments?.length > 0 || uploadQueue.length > 0) && (
          <div
            data-testid="attachments-preview"
            className="flex overflow-x-scroll flex-row gap-2 items-end px-3 py-2"
          >
            {attachments.map((attachment) => (
              <PreviewAttachment
                key={attachment.url}
                attachment={attachment}
                onRemove={() => {
                  setAttachments((currentAttachments) =>
                    currentAttachments.filter((a) => a.url !== attachment.url),
                  );
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
              />
            ))}

            {uploadQueue.map((filename) => (
              <PreviewAttachment
                key={filename}
                attachment={{
                  url: '',
                  name: filename,
                  contentType: '',
                }}
                isUploading={true}
              />
            ))}
          </div>
        )}

        <PromptInputTextarea
          data-testid="multimodal-input"
          ref={textareaRef}
          placeholder="Ask Lovable to create an internal tool that..." // Updated placeholder to match image
          value={input}
          onChange={handleInput}
          minHeight={72}
          maxHeight={200}
          disableAutoResize={true}
          className="text-sm md:text-base resize-none py-4 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-transparent !border-0 !border-none outline-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
          rows={1}
          autoFocus
        />
        <PromptInputToolbar className="px- py-2 !border-t-0 !border-top-0 shadow-none dark:!border-transparent dark:border-0">
          <PromptInputTools className="gap-1">
            <AttachmentsButton
              fileInputRef={fileInputRef}
              status={status}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              handleFileChange={handleFileChange}
            />
            <AttachmentsButton2 fileInputRef={fileInputRef} status={status} />
            <VisibilityButton
              selectedVisibilityType={selectedVisibilityType}
              onVisibilityChange={onVisibilityChange} // Use the prop
            />
            <ToolButton toolName="Supabase" />
          </PromptInputTools>
          <VoiceAndSendButtons status={status} stop={stop} submitForm={submitForm} input={input} uploadQueue={uploadQueue} />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
}

export const MultimodalInput = memo(
  PureMultimodalInput,
  (prevProps, nextProps) => {
    if (prevProps.input !== nextProps.input) return false;
    if (prevProps.status !== nextProps.status) return false;
    if (!equal(prevProps.attachments, nextProps.attachments)) return false;
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType)
      return false;
    if (prevProps.selectedModelId !== nextProps.selectedModelId) return false;

    return true;
  },
);

// function PureAttachmentsButton({
//   fileInputRef,
//   status,
// }: {
//   fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
//   status: UseChatHelpers<ChatMessage>['status'];
// }) {
//   return (
//     <Button
//       data-testid="attachments-button"
//       className=" !rounded-full bg-accent border border-footer-border w-9 h-9 text-secondary hover:text-secondary/50 cursor-pointer "
//       onClick={(event) => {
//         event.preventDefault();
//         fileInputRef.current?.click();
//       }}
//       disabled={status !== 'ready'}
//       variant="ghost"
//     >
//       <Plus className="" size={14} />
//     </Button>
//   );
// }

// const AttachmentsButton = memo(PureAttachmentsButton);

function PureAttachmentsButton({
  fileInputRef,
  status,
  isDialogOpen,
  setIsDialogOpen,
  handleFileChange,
}: {
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  status: UseChatHelpers<ChatMessage>['status'];
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DropdownMenu open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          data-testid="attachments-button"
          className="!rounded-full  border border-footer-border w-9 h-9 text-secondary dark:text-muted hover:text-secondary/50 dark:hover:bg-primary cursor-pointer"
          disabled={status !== 'ready'}
          variant="ghost"
        >
          <Plus className="" size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 p-4 mx-4 bg-background border border-border shadow-lg"
        align="start"
        sideOffset={8}
      >
        

        {/* Quick Actions */}
        <div className="space-y-2 mb-4">
          <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent">
            <Figma className="h-4 w-4 text-purple-500" />
            <div>
              <div className="text-sm font-medium">Import from Figma</div>
              <div className="text-xs text-muted-foreground">Bring in your designs</div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent">
            <Database className="h-4 w-4 text-green-500" />
            <div>
              <div className="text-sm font-medium">Connect Database</div>
              <div className="text-xs text-muted-foreground">Link your data source</div>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const AttachmentsButton = memo(PureAttachmentsButton);

function PureAttachmentsButton2({
  fileInputRef,
  status,
}: {
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  status: UseChatHelpers<ChatMessage>['status'];
}) {
  return (
    <Button
      data-testid="attachments-button"
      className="rounded-full border border-footer-border text-secondary dark:text-muted hover:text-secondary/50 dark:hover:bg-primary cursor-pointer "
      onClick={(event) => {
        event.preventDefault();
        fileInputRef.current?.click();
      }}
      disabled={status !== 'ready'}
      variant="ghost"
    >
      <PaperclipIcon size={14} />
      <span className='hidden md:flex'>Attach</span>
    </Button>
  );
}

const AttachmentsButton2 = memo(PureAttachmentsButton2);

function PureVisibilityButton({ selectedVisibilityType, onVisibilityChange }: VisibilityButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const visibilityOptions = [
    {
      type: 'public' as VisibilityType,
      title: 'Public',
      description: 'Anyone can view and remix',
      detailedDescription: 'Anyone can remix this project. This means copy and build on it. To stop remixing, upgrade to make it private.',
      hasTooltip: true,
    },
    {
      type: 'workspace' as VisibilityType,
      title: 'Workspace Pro',
      description: 'Only visible to your workspace',
      detailedDescription: 'Only visible to your workspace',
      hasTooltip: false,
    },
    {
      type: 'personal' as VisibilityType,
      title: 'Personal Business',
      description: 'Only visible to yourself, unless shared',
      detailedDescription: 'Only visible to yourself, unless shared',
      hasTooltip: false,
    },
  ];

  const currentOption = visibilityOptions.find(opt => opt.type === selectedVisibilityType) || visibilityOptions[0];

  const handleValueChange = (value: string) => {
    const newVisibility = value as VisibilityType;
    onVisibilityChange(newVisibility); // Notify parent of the change
    console.log('Selected visibility:', newVisibility);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full border border-footer-border hover:text-none text-secondary dark:text-muted dark:hover:bg-primary hover:text-secondary/50 cursor-pointer"
          variant="ghost"
        >
          <WorldIcon className=' text-secondary dark:text-muted' size={14} />
          <span className="hidden md:flex ml-1 text-xs">{currentOption.title}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 p-4 dark:bg-primary border-none shadow-lg overflow-visible"
        align="start"
        sideOffset={8}
      >
        <RadioGroup value={selectedVisibilityType} onValueChange={handleValueChange} className="space-y-3">
          {/* Public Option with Tooltip */}
          <div className="relative">
            <Label 
              htmlFor="public" 
              className={cn(
                'flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors',
                selectedVisibilityType === 'public' ? 'bg-accent/10 border border-primary/20' : 'hover:bg-accent/50 dark:hover:bg-accent/10'
              )}
            >
              <RadioGroupItem value="public" id="public" className="mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Public</div>
                  {visibilityOptions[0].hasTooltip && (
                    <div className="relative group">
                      <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center cursor-help">
                        <span className="text-xs font-bold">i</span>
                      </div>
                      <div className="absolute left-full ml-2 top-0 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none min-w-64">
                        <div className="bg-popover text-popover-foreground p-3 rounded-lg shadow-lg border">
                          <div className="text-sm font-medium mb-1">Public</div>
                          <div className="text-xs text-muted-foreground">
                            {visibilityOptions[0].detailedDescription}
                          </div>
                          <div className="absolute right-full top-3 w-0 h-0 border-t-2 border-b-2 border-l-0 border-r-2 border-l-transparent border-r-popover border-t-transparent border-b-transparent"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">
                  {visibilityOptions[0].description}
                </div>
              </div>
            </Label>
          </div>

          {/* Workspace Pro Option */}
          <Label 
            htmlFor="workspace" 
            className={cn(
              'flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors',
              selectedVisibilityType === 'workspace' ? 'bg-accent/10 border border-primary/20' : 'hover:bg-accent/50 dark:hover:bg-accent/10'
            )}
          >
            <RadioGroupItem value="workspace" id="workspace" className="mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Workspace Pro</div>
              <div className="text-xs text-muted-foreground mt-1 leading-tight">
                {visibilityOptions[1].description}
              </div>
            </div>
          </Label>

          {/* Personal Business Option */}
          <Label
            htmlFor="personal" 
            className={cn(
              'flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors',
              selectedVisibilityType === 'personal' ? 'bg-accent/10  border border-primary/20' : 'hover:bg-accent/50 dark:hover:bg-accent/10'
            )}
          >
            <RadioGroupItem value="personal" id="personal" className="mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Personal Business</div>
              <div className="text-xs text-muted-foreground mt-1 leading-tight">
                {visibilityOptions[2].description}
              </div>
            </div>
          </Label>
        </RadioGroup>

        <div className="mt-3 pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            Visibility settings affect who can see this chat
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const VisibilityButton = memo(PureVisibilityButton);

function PureToolButton({ toolName }: { toolName: string }) {
  return (
    <Button
      className="rounded-full border border-footer-border text-secondary dark:text-muted hover:text-secondary/50 dark:hover:bg-primary cursor-pointer"
      variant="ghost"
    >
      <SupabaseIcon size={14} />
      <span className="ml-1 text-xs hidden md:flex">{toolName}</span>
    </Button>
  );
}

const ToolButton = memo(PureToolButton);

function PureVoiceAndSendButtons({
  status,
  stop,
  submitForm,
  input,
  uploadQueue,
}: {
  status: UseChatHelpers<ChatMessage>['status'];
  stop: () => void;
  submitForm: () => void;
  input: string;
  uploadQueue: Array<string>;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        className="w-9 h-9 text-secondary rounded-full border border-footer-border hover:text-secondary/50 dark:hover:bg-primary cursor-pointer"
        variant="ghost"
      >
        <SoundIcon className="text-[#5F5F5D] dark:text-muted" />
      </Button>
      {status === 'submitted' ? (
        <StopButton stop={stop} setMessages={() => {}} />
      ) : (
        <Button
          data-testid="send-button"
          className="rounded-full w-9 h-9 text-background-secondary cursor-pointer"
          onClick={(event) => {
            event.preventDefault();
            submitForm();
          }}
          disabled={!input.trim() || uploadQueue.length > 0}
        >
          <ArrowUpIcon size={14} />
        </Button>
      )}
    </div>
  );
}

const VoiceAndSendButtons = memo(PureVoiceAndSendButtons);

function PureStopButton({
  stop,
  setMessages,
}: {
  stop: () => void;
  setMessages: UseChatHelpers<ChatMessage>['setMessages'];
}) {
  return (
    <Button
      data-testid="stop-button"
      className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
      onClick={(event) => {
        event.preventDefault();
        stop();
        setMessages((messages) => messages);
      }}
    >
      <StopIcon size={14} />
    </Button>
  );
}

const StopButton = memo(PureStopButton);

function PureSendButton({
  submitForm,
  input,
  uploadQueue,
}: {
  submitForm: () => void;
  input: string;
  uploadQueue: Array<string>;
}) {
  return (
    <Button
      data-testid="send-button"
      className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
      onClick={(event) => {
        event.preventDefault();
        submitForm();
      }}
      disabled={input.length === 0 || uploadQueue.length > 0}
    >
      <ArrowUpIcon size={14} />
    </Button>
  );
}

const SendButton = memo(PureSendButton, (prevProps, nextProps) => {
  if (prevProps.uploadQueue.length !== nextProps.uploadQueue.length) return false;
  if (prevProps.input !== nextProps.input) return false;
  return true;
});