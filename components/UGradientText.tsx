import React from 'react';

interface UGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const UGradientText: React.FC<UGradientTextProps> = ({ children, className = "" }) => (
  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 ${className}`}>
    {children}
  </span>
);

export default UGradientText;