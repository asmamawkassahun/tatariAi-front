// // 'use client';

// // import type { UIMessage } from 'ai';
// // import {
// //   useRef,
// //   useEffect,
// //   useState,
// //   useCallback,
// //   type Dispatch,
// //   type SetStateAction,
// //   type ChangeEvent,
// //   memo,
// // } from 'react';
// // import { toast } from 'sonner';
// // import { useLocalStorage, useWindowSize } from 'usehooks-ts';

// // import { ArrowUpIcon, PaperclipIcon, StopIcon } from './icons';
// // import { PreviewAttachment } from './preview-attachment';
// // // import { SuggestedActions } from './suggested-actions';
// // import {
// //   PromptInput,
// //   PromptInputTextarea,
// //   PromptInputToolbar,
// //   PromptInputTools,
// //   PromptInputSubmit,
// //   PromptInputModelSelect,
// //   PromptInputModelSelectTrigger,
// //   PromptInputModelSelectContent,
// // } from './elements/prompt-input';
// // import { SelectItem, SelectValue } from '@/components/ui/select';
// // import equal from 'fast-deep-equal';
// // import type { UseChatHelpers } from '@ai-sdk/react';
// // import { AnimatePresence, motion } from 'framer-motion';
// // import { ArrowDown } from 'lucide-react';
// // import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';
// // import type { VisibilityType } from './visibility-selector';
// // import type { Attachment, ChatMessage } from '@/lib/types';
// // import { chatModels } from '@/lib/ai/models';
// // // import { saveChatModelAsCookie } from '@/app/(chat)/actions';
// // import { startTransition } from 'react';
// // import { Button } from './ui/button';

// // function PureMultimodalInput({
// //   chatId,
// //   input,
// //   setInput,
// //   status,
// //   stop,
// //   attachments,
// //   setAttachments,
// //   messages,
// //   setMessages,
// //   sendMessage,
// //   className,
// //   selectedVisibilityType,
// //   selectedModelId,
// // }: {
// //   chatId: string;
// //   input: string;
// //   setInput: Dispatch<SetStateAction<string>>;
// //   status: UseChatHelpers<ChatMessage>['status'];
// //   stop: () => void;
// //   attachments: Array<Attachment>;
// //   setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
// //   messages: Array<UIMessage>;
// //   setMessages: UseChatHelpers<ChatMessage>['setMessages'];
// //   sendMessage: UseChatHelpers<ChatMessage>['sendMessage'];
// //   className?: string;
// //   selectedVisibilityType: VisibilityType;
// //   selectedModelId: string;
// // })



// import type { UIMessage } from 'ai';
// import {
//   useRef,
//   useEffect,
//   useState,
//   useCallback,
//   type Dispatch,
//   type SetStateAction,
//   type ChangeEvent,
//   memo,
// } from 'react';
// import { toast } from 'sonner';
// import { useLocalStorage, useWindowSize } from 'usehooks-ts';
// import { ArrowUpIcon, PaperclipIcon, StopIcon } from './icons';
// import { PreviewAttachment } from './preview-attachment';
// import {
//   PromptInput,
//   PromptInputTextarea,
//   PromptInputToolbar,
//   PromptInputTools,
//   PromptInputSubmit,
//   PromptInputModelSelect,
//   PromptInputModelSelectTrigger,
//   PromptInputModelSelectContent,
// } from './elements/prompt-input';
// import { SelectItem, SelectValue } from '@/components/ui/select';
// import equal from 'fast-deep-equal';
// import type { UseChatHelpers } from '@ai-sdk/react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { ArrowDown, Plus } from 'lucide-react';
// import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';
// import type { VisibilityType, Attachment, ChatMessage } from '@/lib/types';
// import { chatModels } from '@/lib/ai/models';
// import { Button } from './ui/button';

// interface MultimodalInputProps {
//   chatId: string;
//   input: string;
//   setInput: Dispatch<SetStateAction<string>>;
//   status: UseChatHelpers<ChatMessage>['status'];
//   stop: () => void;
//   attachments: Array<Attachment>;
//   setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
//   messages: Array<ChatMessage>;
//   setMessages: UseChatHelpers<ChatMessage>['setMessages'];
//   sendMessage: UseChatHelpers<ChatMessage>['sendMessage'];
//   className?: string;
//   selectedVisibilityType: VisibilityType;
//   selectedModelId: string;
// }

// function PureMultimodalInput({
//   chatId,
//   input,
//   setInput,
//   status,
//   stop,
//   attachments,
//   setAttachments,
//   messages,
//   setMessages,
//   sendMessage,
//   className,
//   selectedVisibilityType,
//   selectedModelId,
// }: MultimodalInputProps){
//   const textareaRef = useRef<HTMLTextAreaElement>(null);
//   const { width } = useWindowSize();

//   useEffect(() => {
//     if (textareaRef.current) {
//       adjustHeight();
//     }
//   }, []);

//   const adjustHeight = () => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = '72px';
//     }
//   };

//   const resetHeight = () => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = '72px';
//     }
//   };

//   const [localStorageInput, setLocalStorageInput] = useLocalStorage(
//     'input',
//     '',
//   );

//   useEffect(() => {
//     if (textareaRef.current) {
//       const domValue = textareaRef.current.value;
//       // Prefer DOM value over localStorage to handle hydration
//       const finalValue = domValue || localStorageInput || '';
//     //   setInput(finalValue!);
//       adjustHeight();
//     }
//     // Only run once after hydration
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     setLocalStorageInput(input);
//   }, [input, setLocalStorageInput]);

//   const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setInput(event.target.value);
//   };

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);

//   const submitForm = useCallback(() => {
//     window.history.replaceState({}, '', `/chat/${chatId}`);

//     sendMessage({
//       role: 'user',
//       parts: [
//         ...attachments.map((attachment) => ({
//           type: 'file' as const,
//           url: attachment.url,
//           name: attachment.name,
//           mediaType: attachment.contentType,
//         })),
//         {
//           type: 'text',
//           text: input,
//         },
//       ],
//     });

//     setAttachments([]);
//     setLocalStorageInput('');
//     resetHeight();
//     setInput('');

//     if (width && width > 768) {
//       textareaRef.current?.focus();
//     }
//   }, [
//     input,
//     setInput,
//     attachments,
//     sendMessage,
//     setAttachments,
//     setLocalStorageInput,
//     width,
//     chatId,
//   ]);

//   const uploadFile = async (file: File) => {
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('/api/files/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const { url, pathname, contentType } = data;

//         return {
//           url,
//           name: pathname,
//           contentType: contentType,
//         };
//       }
//       const { error } = await response.json();
//       toast.error(error);
//     } catch (error) {
//       toast.error('Failed to upload file, please try again!');
//     }
//   };

//   const handleFileChange = useCallback(
//     async (event: ChangeEvent<HTMLInputElement>) => {
//       const files = Array.from(event.target.files || []);

//       setUploadQueue(files.map((file) => file.name));

//       try {
//         const uploadPromises = files.map((file) => uploadFile(file));
//         const uploadedAttachments = await Promise.all(uploadPromises);
//         const successfullyUploadedAttachments = uploadedAttachments.filter(
//           (attachment) => attachment !== undefined,
//         );

//         setAttachments((currentAttachments) => [
//           ...currentAttachments,
//           ...successfullyUploadedAttachments,
//         ]);
//       } catch (error) {
//         console.error('Error uploading files!', error);
//       } finally {
//         setUploadQueue([]);
//       }
//     },
//     [setAttachments],
//   );

//   const { isAtBottom, scrollToBottom } = useScrollToBottom();

//   useEffect(() => {
//     if (status === 'submitted') {
//       scrollToBottom();
//     }
//   }, [status, scrollToBottom]);

//   return (
//     <div className="flex relative flex-col gap-4 w-full">
//       <AnimatePresence>
//         {!isAtBottom && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//             className="absolute bottom-28 left-1/2 z-50 -translate-x-1/2"
//           >
//             <Button
//               data-testid="scroll-to-bottom-button"
//               className="rounded-full"
//               size="icon"
//               variant="outline"
//               onClick={(event) => {
//                 event.preventDefault();
//                 scrollToBottom();
//               }}
//             >
//               <ArrowDown />
//             </Button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* {messages.length === 0 &&
//         attachments.length === 0 &&
//         uploadQueue.length === 0 && (
//           <SuggestedActions
//             sendMessage={sendMessage}
//             chatId={chatId}
//             selectedVisibilityType={selectedVisibilityType}
//           />
//         )} */}


//       <input
//         type="file"
//         className="fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none"
//         ref={fileInputRef}
//         multiple
//         onChange={handleFileChange}
//         tabIndex={-1}
//       />

//       <PromptInput
//         className="bg-gray-50 rounded-3xl border border-gray-300 shadow-none transition-all duration-200 dark:bg-sidebar dark:border-sidebar-border hover:ring-1 hover:ring-primary/30 focus-within:ring-1 focus-within:ring-primary/50"
//         onSubmit={(event) => {
//           event.preventDefault();
//           if (status !== 'ready') {
//             toast.error('Please wait for the model to finish its response!');
//           } else {
//             submitForm();
//           }
//         }}
//       >
//         {(attachments?.length > 0 || uploadQueue.length > 0) && (
//           <div
//             data-testid="attachments-preview"
//             className="flex overflow-x-scroll flex-row gap-2 items-end px-3 py-2"
//           >
//             {attachments.map((attachment) => (
//               <PreviewAttachment
//                 key={attachment.url}
//                 attachment={attachment}
//                 onRemove={() => {
//                   setAttachments((currentAttachments) =>
//                     currentAttachments.filter((a) => a.url !== attachment.url),
//                   );
//                   if (fileInputRef.current) {
//                     fileInputRef.current.value = '';
//                   }
//                 }}
//               />
//             ))}

//             {uploadQueue.map((filename) => (
//               <PreviewAttachment
//                 key={filename}
//                 attachment={{
//                   url: '',
//                   name: filename,
//                   contentType: '',
//                 }}
//                 isUploading={true}
//               />
//             ))}
//           </div>
//         )}

//         <PromptInputTextarea
//           data-testid="multimodal-input"
//           ref={textareaRef}
//           placeholder="Send a message..."
//           value={input}
//           onChange={handleInput}
//           minHeight={72}
//           maxHeight={200}
//           disableAutoResize={true}
//           className="text-base resize-none py-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-transparent !border-0 !border-none outline-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
//           rows={1}
//           autoFocus
//         />
//         <PromptInputToolbar className="px-4 py-2 !border-t-0 !border-top-0 shadow-none dark:!border-transparent dark:border-0">
//           <PromptInputTools className="gap-2">
//             <AttachmentsButton fileInputRef={fileInputRef} status={status} />
//             <ModelSelectorCompact selectedModelId={selectedModelId} />
//           </PromptInputTools>
//           {status === 'submitted' ? (
//             <StopButton stop={stop} setMessages={setMessages} />
//           ) : (
//             <PromptInputSubmit
//               status={status}
//               disabled={!input.trim() || uploadQueue.length > 0}
//               className="p-3 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-sidebar-accent dark:hover:bg-sidebar-accent/80 dark:text-gray-300"
//             >
//               <ArrowUpIcon size={20} />
//             </PromptInputSubmit>
//           )}
//         </PromptInputToolbar>
//       </PromptInput>
//     </div>
//   );
// }

// export const MultimodalInput = memo(
//   PureMultimodalInput,
//   (prevProps, nextProps) => {
//     if (prevProps.input !== nextProps.input) return false;
//     if (prevProps.status !== nextProps.status) return false;
//     if (!equal(prevProps.attachments, nextProps.attachments)) return false;
//     if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType)
//       return false;
//     if (prevProps.selectedModelId !== nextProps.selectedModelId) return false;

//     return true;
//   },
// );

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
//       className="rounded-full rounded-bl-lg p-[7px] h-fit dark:border-zinc-700 hover:dark:bg-zinc-900 hover:bg-zinc-200"
//       onClick={(event) => {
//         event.preventDefault();
//         fileInputRef.current?.click();
//       }}
//       disabled={status !== 'ready'}
//       variant="ghost"
//     >
//       {/* <PaperclipIcon size={14} /> */}
//       <Plus className="" size={14} />
//     </Button>
//   );
// }

// const AttachmentsButton = memo(PureAttachmentsButton);

// function PureModelSelectorCompact({
//   selectedModelId,
// }: {
//   selectedModelId: string;
// }) {
//   const [optimisticModelId, setOptimisticModelId] = useState(selectedModelId);

//   const selectedModel = chatModels.find(
//     (model) => model.id === optimisticModelId,
//   );

//   return (
//     <PromptInputModelSelect
//       value={selectedModel?.name}
//     //   onValueChange={(modelName) => {
//     //     const model = chatModels.find((m) => m.name === modelName);
//     //     if (model) {
//     //       setOptimisticModelId(model.id);
//     //       startTransition(() => {
//     //         saveChatModelAsCookie(model.id);
//     //       });
//     //     }
//     //   }}
//     >
//       <PromptInputModelSelectTrigger
//         type="button"
//         className="text-xs focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:ring-0 data-[state=closed]:ring-0"
//       >
//         {selectedModel?.name || 'Select model'}
//       </PromptInputModelSelectTrigger>
//       <PromptInputModelSelectContent>
//         {chatModels.map((model) => (
//           <SelectItem key={model.id} value={model.name}>
//             <div className="flex flex-col gap-1 items-start py-1">
//               <div className="font-medium">{model.name}</div>
//               <div className="text-xs text-muted-foreground">
//                 {model.description}
//               </div>
//             </div>
//           </SelectItem>
//         ))}
//       </PromptInputModelSelectContent>
//     </PromptInputModelSelect>
//   );
// }

// const ModelSelectorCompact = memo(PureModelSelectorCompact);

// function PureStopButton({
//   stop,
//   setMessages,
// }: {
//   stop: () => void;
//   setMessages: UseChatHelpers<ChatMessage>['setMessages'];
// }) {
//   return (
//     <Button
//       data-testid="stop-button"
//       className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
//       onClick={(event) => {
//         event.preventDefault();
//         stop();
//         setMessages((messages) => messages);
//       }}
//     >
//       <StopIcon size={14} />
//     </Button>
//   );
// }

// const StopButton = memo(PureStopButton);

// function PureSendButton({
//   submitForm,
//   input,
//   uploadQueue,
// }: {
//   submitForm: () => void;
//   input: string;
//   uploadQueue: Array<string>;
// }) {
//   return (
//     <Button
//       data-testid="send-button"
//       className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
//       onClick={(event) => {
//         event.preventDefault();
//         submitForm();
//       }}
//       disabled={input.length === 0 || uploadQueue.length > 0}
//     >
//       <ArrowUpIcon size={14} />
//     </Button>
//   );
// }

// const SendButton = memo(PureSendButton, (prevProps, nextProps) => {
//   if (prevProps.uploadQueue.length !== nextProps.uploadQueue.length)
//     return false;
//   if (prevProps.input !== nextProps.input) return false;
//   return true;
// });






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
import { ArrowDown, GlobeIcon, Image, MicIcon, Plus, PowerIcon } from 'lucide-react';
import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';
import type { VisibilityType, Attachment, ChatMessage } from '@/lib/types';
import { chatModels } from '@/lib/ai/models';
import { Button } from './ui/button';

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
}: MultimodalInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();

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

  const [localStorageInput, setLocalStorageInput] = useLocalStorage(
    'input',
    '',
  );

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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);

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
        className="bg-accent rounded-[1.75rem] border border-primary/20 shadow-[0px_8px_10px_-6px_#0000001A] transition-all duration-200 dark:bg-sidebar dark:border-sidebar-border p-3"
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
            <AttachmentsButton fileInputRef={fileInputRef} status={status} />
            <AttachmentsButton2 fileInputRef={fileInputRef} status={status} /> {/* Second attachments button */}
            <VisibilityButton selectedVisibilityType={selectedVisibilityType} /> {/* New button for visibility */}
            <ToolButton toolName="Supabase" /> {/* New button for Supabase tool */}
            {/* <ModelSelectorCompact selectedModelId={selectedModelId} /> */} {/* Commented out model selector */}
          </PromptInputTools>
          <VoiceAndSendButtons status={status} stop={stop} submitForm={submitForm} input={input} uploadQueue={uploadQueue} /> {/* New component for voice and send buttons */}
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

function PureAttachmentsButton({
  fileInputRef,
  status,
}: {
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  status: UseChatHelpers<ChatMessage>['status'];
}) {
  return (
    <Button
      data-testid="attachments-button"
      className=" !rounded-full bg-accent border border-footer-border w-9 h-9 text-secondary hover:text-secondary/50 cursor-pointer "
      onClick={(event) => {
        event.preventDefault();
        fileInputRef.current?.click();
      }}
      disabled={status !== 'ready'}
      variant="ghost"
    >
      <Plus className="" size={14} />
    </Button>
  );
}

const AttachmentsButton = memo(PureAttachmentsButton);

// New function for VisibilityButton
function PureVisibilityButton({ selectedVisibilityType }: { selectedVisibilityType: VisibilityType }) {
  return (
    <Button
      className="rounded-full border border-footer-border hover:text-none text-secondary hover:text-secondary/50 cursor-pointer"
      variant="ghost"
    >
      <WorldIcon size={14} /> {/* Assuming GlobeIcon is available or replace with appropriate icon */}
      <span className="hidden md:flex ml-1 text-xs">Public</span> {/* Matches the "Public" label in the image */}
    </Button>
  );
}

const VisibilityButton = memo(PureVisibilityButton);


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
      className="rounded-full border border-footer-border text-secondary hover:text-secondary/50 cursor-pointer "
      onClick={(event) => {
        event.preventDefault();
        fileInputRef.current?.click();
      }}
      disabled={status !== 'ready'}
      variant="ghost"
    >
      <PaperclipIcon size={14} />
      <span className='hidden md:flex'>Attach</span>
      {/* <Plus className="" size={14} /> */}
    </Button>
  );
}

const AttachmentsButton2 = memo(PureAttachmentsButton2);


// New function for ToolButton
function PureToolButton({ toolName }: { toolName: string }) {
  return (
    <Button
      className="rounded-full border border-footer-border text-secondary hover:text-secondary/50 cursor-pointer"
      variant="ghost"
    >
      <SupabaseIcon size={14} /> {/* Assuming LightningBoltIcon is available or replace with appropriate icon */}
      <span className="ml-1 text-xs hidden md:flex">{toolName}</span> {/* Matches the "Supabase" label in the image */}
    </Button>
  );
}

const ToolButton = memo(PureToolButton);

// New function for VoiceAndSendButtons
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
        className="w-9 h-9 text-secondary rounded-full border border-footer-border hover:text-secondary/50 cursor-pointer"
        variant="ghost"
      >
        <SoundIcon /> {/* Assuming MicIcon is available or replace with appropriate icon */}
      </Button>
      {status === 'submitted' ? (
        // Placeholder setMessages, adjust if needed
        <StopButton stop={stop} setMessages={() => { }} />
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
  if (prevProps.uploadQueue.length !== nextProps.uploadQueue.length)
    return false;
  if (prevProps.input !== nextProps.input) return false;
  return true;
});