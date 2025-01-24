// src/components/Message.tsx
import React, { useMemo, useState } from "react";
import { Message as MessageType } from "../types";
import { AlertTriangle, CreditCard } from "lucide-react";
import { MenuItem } from "./MenuItem";
import { MenuList } from "./MenuList";
import { DeliveryForm } from "./DeliveryForm";
import { PaymentForm } from "./PaymentForm";
import { useChatContext } from "../context/ChatContext";

interface MessageProps {
  message: MessageType;
  onRetry: () => void;
}

export const Message: React.FC<MessageProps> = ({ message, onRetry }) => {
  const { state } = useChatContext();
  const isError =
    message.text.toLowerCase().includes("error") ||
    message.text.toLowerCase().includes("sorry");

  const handleRemoveCard = (messageId: number, cardId: number) => {};

  return (
    <div
      className={`mb-4 flex ${message.isBot ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[90%] rounded-2xl p-3 ${
          message.isBot
            ? isError
              ? "bg-red-50 text-red-700"
              : "bg-white/80 shadow-sm backdrop-blur-sm"
            : "bg-orange-500 text-white"
        }`}
      >
        {message.queryType === "CHECKOUT" &&
          message.isBot &&
          state.checkout.step === "details" && (
            <DeliveryForm onSubmit={onRetry} />
          )}

        {message.queryType === "CHECKOUT" &&
          message.isBot &&
          state.checkout.step === "payment" && (
            <PaymentForm onSubmit={onRetry} />
          )}

        {message.text && isError && message.isBot && (
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0" />
            <p>{message.text}</p>
          </div>
        )}

        {message.isBot && message.structuredText && (
          <div>
            <p className="text-gray-600">{message.structuredText.start}</p>
            {message.structuredText.menu?.length > 0 && (
              <div>
                <MenuList
                  messageId={message.id}
                  items={message.structuredText.menu}
                />
              </div>
            )}

            {/* <p className="text-gray-600">{message.structuredText.end}</p> */}
          </div>
        )}
        {message.queryType === "MENU_QUERY" && !message.isBot && (
          <div>{message.text}</div>
        )}
        {!message.structuredText && message.queryType != "MENU_QUERY" && (
          <div>{message.text}</div>
        )}

        <span className="text-xs text-gray-500 mt-1 block">{message.time}</span>

        {isError && message.isBot && (
          <button
            onClick={onRetry}
            className="mt-2 text-sm text-orange-500 hover:text-orange-600 transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
};
