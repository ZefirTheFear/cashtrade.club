export const CLOSE_MOBILE_MENU = "CLOSE_MOBILE_MENU";
export const TOGGLE_MOBILE_MENU = "TOGGLE_MOBILE_MENU";

export interface CloseMobileMenu {
  type: typeof CLOSE_MOBILE_MENU;
}

export interface ToggleMobileMenu {
  type: typeof TOGGLE_MOBILE_MENU;
}

export type MobileMenuActionType = CloseMobileMenu | ToggleMobileMenu;
