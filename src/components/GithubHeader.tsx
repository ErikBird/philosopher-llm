import React from 'react';

// React functional component
const GithubHeader = () => {
  return (
    <div className="hidden md:flex w-full justify-end text-Black text-center h-20">
      {/* Anchor tag with href, target, and rel attributes */}
      <a href="https://github.com/ErikBird/therapist-llm" target="_blank" rel="noopener noreferrer">
        {/* Image tag with src and alt attributes */}
        <img className="w-6 h-6 m-2" src="/src/assets/github-mark.png" alt="GitHub Repository" />
      </a>
    </div>
  );
};

export default GithubHeader;