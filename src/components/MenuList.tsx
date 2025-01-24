import React, { useMemo } from "react";
import { RefreshCw } from "lucide-react";
import { MenuItem } from "./MenuItem";
import { menuItems } from "../data/menuData";
import { useChatContext, QueryType } from "../context/ChatContext";
import { ChatService } from "../services/chatService";

const chatService = new ChatService();

interface MenuListProps {
  messageId: number;
  items: any[];
}

export const MenuList: React.FC<MenuListProps> = ({ messageId, items }) => {
  const { state, dispatch } = useChatContext();

  // Get serialized memory for chat context
  const serializedMemory = React.useMemo(() => {
    return state.messages
      .map((message) =>
        message.isBot ? `Bot: ${message.text}` : `User: ${message.text}`
      )
      .join("\n");
  }, [state.messages]);

  const filteredMenuItems = useMemo(() => {
    // Create a map from the items array for quick lookup
    const itemMap = new Map(items.map((item) => [item.id, item.quantity]));

    // Filter menuItems and include the quantity from the items array
    return menuItems
      .filter((menuItem) => itemMap.has(menuItem.id.toString()))
      .map((menuItem) => ({
        ...menuItem,
        quantity: itemMap.get(menuItem.id.toString()), // Add quantity to the result
      }));
  }, [items, menuItems]);

  return (
    <div className="mt-2 -mx-4">
      <div className="flex overflow-x-auto px-4 gap-3 snap-x scrollbar-hide pb-2">
        {filteredMenuItems.map((meal, index) => (
          <div key={index} className="flex-none w-[140px] snap-start">
            <MenuItem
              id={meal.id}
              name={meal.name}
              price={meal.price}
              image={meal.image}
              quantity={meal.quantity}
              compact={true}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-3">
        <button
          onClick={() => {
            dispatch({
              type: "ADD_MESSAGE",
              payload: {
                id: Date.now(),
                text: "Suggest me with other options from the menu",
                isBot: false,
                time: new Date().toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }),
                queryType: QueryType.MENU_QUERY,
              },
            });
            dispatch({ type: "SET_LOADING", payload: true });
            chatService
              .queryMenu(
                "Suggest me better options from the menu",
                serializedMemory
              )
              .then((response) => {
                dispatch({
                  type: "ADD_MESSAGE",
                  payload: {
                    id: Date.now() + 1,
                    text: response.response,
                    isBot: true,
                    time: new Date().toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }),
                    queryType: QueryType.MENU_QUERY,
                  },
                });
              })
              .catch((error) => {
                console.error("Error getting suggestions:", error);
                dispatch({
                  type: "ADD_MESSAGE",
                  payload: {
                    id: Date.now() + 1,
                    text: "Sorry, I couldn't get new suggestions right now. Please try again.",
                    isBot: true,
                    time: new Date().toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }),
                    queryType: QueryType.GENERAL,
                  },
                });
              })
              .finally(() => {
                dispatch({ type: "SET_LOADING", payload: false });
              });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="text-sm font-medium">Suggest new</span>
        </button>
      </div>
    </div>
  );
};
