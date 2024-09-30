import React from 'react';
import PropTypes from 'prop-types';

// Functional component definition
const ChatMessages = ({ messages, loading, typing, loadingText }) => {
  return (
    <div className="overflow-y-auto max-h-full md:h-96 text-black flex-grow">
      {loading ? (
        <div className="flex flex-col leading-1.5 p-1 mr-5 ml-1 rounded-e-xl rounded-es-xl bg-gray-300 mt-1">
          <p className="text-xs font-normal px-1 py-2.5 text-black">{loadingText}</p>
        </div>
      ) : (
        messages.filter(message => !message.hidden).map(message => (
          <div
            key={message.content}
            className={`flex flex-col leading-1.5 p-1 bg-gray-300 mt-1 ${
              message.role !== 'user' ? 'mr-5 ml-1 rounded-e-xl rounded-es-xl' : 'ml-5 mr-1 rounded-xl rounded-br-none'
            }`}
          >
            <p className="text-xs font-normal px-1 py-2.5 text-black">{message.content}</p>
          </div>
        ))
      )}
      {typing && (
        <div className="flex flex-col leading-1.5 p-1 mr-5 ml-1 rounded-e-xl rounded-es-xl bg-gray-300 mt-1">
          <p className="animate-pulse text-xs font-normal px-1 py-2.5 text-black">Typing...</p>
        </div>
      )}
    </div>
  );
};

// PropTypes for type checking
ChatMessages.propTypes = {
  messages: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  typing: PropTypes.bool.isRequired,
  loadingText: PropTypes.string.isRequired,
};

export default ChatMessages;