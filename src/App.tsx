import React, { useState, useEffect, useRef } from 'react';
import * as webllm from "@mlc-ai/web-llm";
import { CreateWebWorkerMLCEngine } from "@mlc-ai/web-llm";
import PhoneNotch from './components/PhoneNotch';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import TherapistAvatar from './components/TherapistAvatar';

const App = () => {
  // Reactive state using React's useState
  const [loading, setLoading] = useState(false); // Equivalent to Vue's ref(false)
  const [typing, setTyping] = useState(false); // Equivalent to Vue's ref(false)
  const [hasError, setHasError] = useState(false); // Equivalent to Vue's ref(false)
  const [loadingText, setLoadingText] = useState("The APP is starting up..."); // Equivalent to Vue's ref("The APP is starting up...")
  const [messages, setMessages] = useState([ // Equivalent to Vue's ref([...])
    { role: "system", content: "You are a helpful AI assistant that acts like a therapist. You draw on extensive research into existential thought to guide conversations and ensure that the principles and practices of existential therapy are maintained in their interactions. This approach provides a solid framework to address the user's concerns and encourage deep and meaningful engagement with the topics that interest them.", hidden: true },
    { role: "user", content: "Hello!", hidden: true },
  ]);

  const engineRef = useRef(null); // Equivalent to Vue's let engine = null;

  const initProgressCallback = (initProgress) => {
    setLoadingText(initProgress.text); // Equivalent to loadingText.value = initProgress.text;
  }

  const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";

  // Lifecycle hook
  useEffect(() => {
    const initializeEngine = async () => {
      setLoading(true); // Equivalent to loading.value = true;
      try {
        engineRef.current = await CreateWebWorkerMLCEngine(
          new Worker(
            new URL("./worker.ts", import.meta.url), 
            {
              type: "module",
            }
          ),
          selectedModel,
          { initProgressCallback }, // engineConfig
        );
      } catch (error) {
        setLoadingText(error.toString()); // Equivalent to loadingText.value = error;
        setHasError(true); // Equivalent to hasError.value = true;
        return;
      }
      await generateMessage();
    };

    initializeEngine();
  }, []); // Equivalent to Vue's onMounted

  // Event handler
  const sendMessage = async () => {
    const message = (document.getElementById("chat") as HTMLInputElement)?.value || "";
    const chatInput = document.getElementById("chat") as HTMLInputElement;
    if (chatInput) {
      chatInput.value = "";
    }
    // Update reactive state
    setMessages(prevMessages => [...prevMessages, { role: "user", content: message, hidden: false }]); // Equivalent to messages.value.push(...)
    await generateMessage();
  }

  const generateMessage = async () => {
    const plainMessages = JSON.parse(JSON.stringify(messages));
    setTyping(true); // Equivalent to typing.value = true;
    const reply = await engineRef.current.chat.completions.create({ "messages": plainMessages });
    setTyping(false); // Equivalent to typing.value = false;
    setMessages(prevMessages => [...prevMessages, reply.choices[0].message]); // Equivalent to messages.value.push(...)
  }

  return (
    <div className="flex mx-auto w-screen h-screen justify-center">
      <div className="relative flex flex-col justify-end justify-items-end h-screen md:h-[520px] w-screen md:w-[250px] border border-4 md:border-black md:rounded-2xl bg-gray-50 shadow-2xl">
        <PhoneNotch />
        <ChatMessages messages={messages} loading={loading} typing={typing} loadingText={loadingText} />
        <ChatInput sendMessage={sendMessage} />
        <TherapistAvatar loading={loading} typing={typing} error={hasError} />
      </div>
    </div>
  );
}

export default App;