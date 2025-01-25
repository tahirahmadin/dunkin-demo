import React, { useMemo, useState } from "react";
import axios from "axios"; // For making API calls
import { menuItems } from "../data/menuData"; // Import the menu data and type
import { MenuItem } from "./MenuItem";

interface ApiResponse {
  text: string;
  items: { id: number; name: string; price: string }[];
}

const MenuChatWithDeepSeek: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Replace with your DeepSeek API endpoint and API key
  const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"; // Example endpoint
  const API_KEY = "sk-7907b7d96889474faa17920e3c935ee3"; // Replace with your actual API key

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const prompt = `Here is the menu data: ${JSON.stringify(
        menuItems
      )}. Based on this, answer the user's query: ${inputText}. Return the response in the format { text: "", items: [{ id: number, name: string, price: string }] }, where "text" is a summary and "items" is an array of matching menu items with only id, name, and price. Include a maximum of 7 items. Do not include any additional text or explanations.`;
      // Call the DeepSeek API with the correct request format
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: "deepseek-chat", // Specify the model you're using
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 2000, // Adjust based on your needs
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      // Parse the API response
      const apiResponseText = response.data.choices[0].message.content;
      console.log(apiResponseText);
      const apiResponse = JSON.parse(apiResponseText) as ApiResponse;
      setResponse(apiResponse);
    } catch (error) {
      console.error("Error calling DeepSeek API:", error);
      setResponse({
        text: "Failed to fetch response. Please try again.",
        items: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMenuItems = useMemo(() => {
    // Create a map from the items array for quick lookup
    if (response?.items) {
      const itemMap = new Map(
        response.items.map((item) => [item.id, item.name])
      );

      // Filter menuItems and include the quantity from the items array
      return menuItems
        .filter((menuItem) => itemMap.has(menuItem.id))
        .map((menuItem) => ({
          ...menuItem,
          quantity: itemMap.get(menuItem.id), // Add quantity to the result
        }));
    }

    return [];
  }, [response, menuItems]);

  return (
    <div>
      <h1>Menu Chat with DeepSeek</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask about the menu..."
          rows={4}
          cols={50}
        />
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>

      {response && (
        <div className="mt-2 mx-4">
          <p className="pl-7">{response.text}</p>
          <div className="flex overflow-x-auto px-4 gap-3 snap-x scrollbar-hide pb-2">
            {filteredMenuItems.map((meal, index) => (
              <div key={index} className="flex-none w-[140px] snap-start">
                <MenuItem
                  id={meal.id}
                  name={meal.name}
                  price={meal.price}
                  image={meal.image}
                  quantity={2}
                  compact={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuChatWithDeepSeek;
