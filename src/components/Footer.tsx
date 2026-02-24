import React from 'react';
import LogoU3 from './LogoU3';

const Footer: React.FC = () => (
  <footer className="bg-white border-t border-slate-100 py-12 text-center">
    <div className="flex justify-center mb-4">
        <LogoU3 />
    </div>
    <p className="text-slate-500 text-sm mt-4">© 2026 Campaña Alfredo Deluque. Publicidad Política Pagada. <span className="text-xs opacity-50">v1.2</span></p>
  </footer>
);

export default Footer;
