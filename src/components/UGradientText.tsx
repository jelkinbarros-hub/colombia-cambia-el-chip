import React from 'react';

interface UGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const UGradientText: React.FC<UGradientTextProps> = ({ children, className = '' }) => {
  return (
    <span className={`text-transparent bg-clip-text ${className}`}>
      {children}
    </span>
  );
};

export default UGradientText;
