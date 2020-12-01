import * as mobileMenuActionTypes from "./mobileMenuActionTypes";

export const closeMobileMenu = (): mobileMenuActionTypes.CloseMobileMenu => ({
  type: mobileMenuActionTypes.CLOSE_MOBILE_MENU
});

export const toggleMobileMenu = (): mobileMenuActionTypes.ToggleMobileMenu => ({
  type: mobileMenuActionTypes.TOGGLE_MOBILE_MENU
});
