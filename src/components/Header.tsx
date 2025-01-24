import React from 'react';
import { MoreHorizontal, ShoppingBag, ChevronDown } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

interface HeaderProps {
  onOpenPanel: () => void;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPanel, onCartClick }) => {
  const { state } = useChatContext();
  
  const cartTotal = React.useMemo(() => {
    return state.cart.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0).toFixed(2);
  }, [state.cart]);

  return (
    <div className="p-4 border-b border-white/20 flex items-center justify-between bg-white/50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <img 
          src="https://i.pinimg.com/474x/fc/39/fc/fc39fcad149b7149317c4ae616673eda.jpg"
          alt="Dunkin' Donuts Logo"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <h1 className="font-semibold">Dunkin' Order Agent</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        
        <button 
          onClick={onOpenPanel} 
          className="p-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};