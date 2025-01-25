// src/components/ChatInput.tsx
import React from "react";
import { Send, Coffee, Pizza, Clock, Siren as Fire } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  showQuickActions?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  onSubmit,
  isLoading = false,
  showQuickActions = true,
}) => {
  const handleQuickAction = (message: string) => {
    setInput(message);
    const event = new Event("submit") as unknown as React.FormEvent;
    onSubmit(event);
  };

  return (
    <div className="p-4 border-t border-white/20 bg-white/50 backdrop-blur-sm">
      <div className="h-[160px]">
        {showQuickActions && !input && (
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() =>
                handleQuickAction("Suggest Lunch combo for AED 50 or less?")
              }
              className="flex items-center gap-2 p-3 bg-white/80 rounded-xl hover:bg-white/90 transition-colors text-sm text-gray-700 border border-gray-100"
            >
              <Fire className="w-4 h-4 text-orange-500" />
              <span className="text-left">
                <span className="font-medium block">Lunch combo</span>
                <span className="text-xs text-gray-500">
                  Lunch combo in AED 50
                </span>
              </span>
            </button>

            <button
              onClick={() => handleQuickAction("Suggest Best Hot Coffees?")}
              className="flex items-center gap-2 p-3 bg-white/80 rounded-xl hover:bg-white/90 transition-colors text-sm text-gray-700 border border-gray-100"
            >
              <Coffee className="w-4 h-4 text-orange-500" />
              <span className="text-left">
                <span className="font-medium block">Best Hot Coffees</span>
                <span className="text-xs text-gray-500">
                  Suggest Best Hot Coffees
                </span>
              </span>
            </button>

            <button
              onClick={() => handleQuickAction("Suggest Donut Box Deal?")}
              className="flex items-center gap-2 p-3 bg-white/80 rounded-xl hover:bg-white/90 transition-colors text-sm text-gray-700 border border-gray-100"
            >
              <Pizza className="w-4 h-4 text-orange-500" />
              <span className="text-left">
                <span className="font-medium block">Donut Box Deal</span>
                <span className="text-xs text-gray-500">
                  Suggest Donut Box Deal
                </span>
              </span>
            </button>

            <button
              onClick={() => handleQuickAction("Suggest Coffee and Donuts?")}
              className="flex items-center gap-2 p-3 bg-white/80 rounded-xl hover:bg-white/90 transition-colors text-sm text-gray-700 border border-gray-100"
            >
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-left">
                <span className="font-medium block">Coffee and Donuts</span>
                <span className="text-xs text-gray-500">
                  Suggest Coffee & Donuts
                </span>
              </span>
            </button>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask about the menu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="flex-1 p-2 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 backdrop-blur-sm placeholder:text-gray-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2 bg-orange-500 hover:bg-orange-600 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
