import * as mobileMenuActionsTypes from "../actions/mobileMenuActions/mobileMenuActionTypes";

interface MobileMenuState {
  isOpen: boolean;
}

const initialState: MobileMenuState = {
  isOpen: false
};

const mobileMenuReducer = (
  state = initialState,
  action: mobileMenuActionsTypes.MobileMenuActionType
): MobileMenuState => {
  switch (action.type) {
    case mobileMenuActionsTypes.CLOSE_MOBILE_MENU:
      return { ...state, isOpen: false };

    case mobileMenuActionsTypes.TOGGLE_MOBILE_MENU:
      return { ...state, isOpen: !state.isOpen };

    default:
      return state;
  }
};
export default mobileMenuReducer;
