import React from 'react';
import UGradientText from './UGradientText';

const LogoU3: React.FC = () => (
  <div className="flex items-center font-extrabold text-2xl tracking-tighter cursor-pointer select-none">
    <span className="text-slate-900">DELUQ</span>
    <span className="relative flex items-center justify-center font-black">
      <UGradientText>U</UGradientText>
    </span>
    <span className="text-yellow-500 text-3xl drop-shadow-sm filter">3</span>
  </div>
);

export default LogoU3;