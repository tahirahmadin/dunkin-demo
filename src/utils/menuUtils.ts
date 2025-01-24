import { menuItems } from "../data/menuData";

export const findMenuItemById = (id: number) => {
  return menuItems.find((item) => item.id === id);
};
