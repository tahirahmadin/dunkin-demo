import React from "react";
import { X, Plus, Minus } from "lucide-react";
import { useChatContext } from "../context/ChatContext";

interface MenuItemProps {
  name: string;
  price: string;
  id: number;
  image: string;
  quantity: number;
  compact?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  id,
  name,
  price,
  image,
  quantity,
  compact = false,
}) => {
  const { state, dispatch } = useChatContext();

  // Check if item is in cart
  const cartItem = state.cart.find((item) => item.id === id);
  const isInCart = Boolean(cartItem);

  const handleRemove = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, name, price, quantity: 1 },
    });
  };
  return (
    <div
      className={`bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
        compact ? "p-1.5" : "p-3"
      }`}
    >
      <div className="relative">
        <div
          className={`aspect-square w-full flex items-center justify-center rounded-xl bg-gray-50 ${
            compact ? "p-0.5" : "p-2"
          }`}
        >
          <img
            src={image}
            alt={name}
            className={`w-full object-contain rounded-xl ${
              compact ? "p-1" : "p-2"
            }`}
          />
        </div>
        <h3
          className={`font-medium text-gray-800 ${
            compact ? "text-[12px] mt-1" : "text-sm mt-2"
          } line-clamp-2`}
        >
          {name}
        </h3>
        <div
          className={`flex items-center justify-between ${
            compact ? "mt-1" : "mt-2"
          }`}
        >
          <p
            className={`text-orange-500 font-bold ${
              compact ? "text-[10px]" : "text-sm"
            }`}
          >
            {price} AED
          </p>
          <div>
            <button
              onClick={handleAddToCart}
              className={`${
                compact ? "p-0.5" : "p-1.5"
              } flex items-center justify-center rounded-full transition-all ${
                isInCart
                  ? "bg-orange-500 text-white hover:bg-orange-600 shadow-sm"
                  : "bg-orange-50 text-orange-600 hover:bg-orange-100"
              }`}
            >
              <Plus className={compact ? "w-3.5 h-3.5" : "w-3.5 h-3.5"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
