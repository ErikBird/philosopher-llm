import React from 'react';
import annoyedAvatar from '/src/assets/annoyed.jpeg';
import waitingAvatar from '/src/assets/waiting.jpeg';
import thinkingAvatar from '/src/assets/thinking.jpeg';
import listeningAvatar from '/src/assets/listening.jpeg';

const TherapistAvatar = ({ error, loading, typing }) => {
  return (
    <div>
      {error && (
        <img
          className="hidden md:block absolute -right-72 top-0 rounded-full w-44 h-44"
          src={annoyedAvatar}
          alt="annoyed avatar"
        />
      )}
      {loading && !error && (
        <img
          className="hidden md:block absolute -right-72 top-0 rounded-full w-44 h-44"
          src={waitingAvatar}
          alt="waiting avatar"
        />
      )}
      {typing && !error && !loading && (
        <img
          className="hidden md:block absolute -right-72 top-0 rounded-full w-44 h-44"
          src={thinkingAvatar}
          alt="thinking avatar"
        />
      )}
      {!typing && !loading && !error && (
        <img
          className="hidden md:block absolute -right-72 top-0 rounded-full w-44 h-44"
          src={listeningAvatar}
          alt="listening avatar"
        />
      )}
    </div>
  );
};

export default TherapistAvatar;