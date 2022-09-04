export const SHOW_POPUP_TYPE = 'SHOW_POPUP_TYPE';
export const HIDE_POPUP_TYPE = 'HIDE_POPUP_TYPE';

export const showPopupAction = (popup) => ({
  type: SHOW_POPUP_TYPE,
  payload: popup,
});

export const hidePopupAction = () => ({
  type: HIDE_POPUP_TYPE
});