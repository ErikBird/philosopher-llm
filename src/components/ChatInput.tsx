import React from 'react';

const ChatInput = ({ onSendMessage }) => {
  const sendMessage = () => {
    onSendMessage();
  };

  return (
    <div className="flex items-center py-2 md:rounded-b-xl bg-gray-300">
      <textarea
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
          }
        }}
        id="chat"
        rows={1}
        className="block mx-2 p-2.5 w-full h-[92px] text-sm text-black bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Your message..."
      ></textarea>
      <button
        onClick={sendMessage}
        className="inline-flex justify-center p-2 text-black rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
      >
        <svg
          className="w-5 h-5 rotate-90 rtl:-rotate-90"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
        </svg>
        <span className="sr-only">Send message</span>
      </button>
    </div>
  );
};

export default ChatInput;