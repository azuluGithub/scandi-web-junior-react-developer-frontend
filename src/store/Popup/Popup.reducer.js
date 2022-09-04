import {
    SHOW_POPUP_TYPE, 
    HIDE_POPUP_TYPE
} from './Popup.action';


const initPopup = () => ({
    popup: null,
});

const initialPopupState = () => ({
    ...initPopup(),
});


export const popupReducer = (state = initialPopupState(), action = {}) => {
    const { type, payload } = action;
    
    switch (type) {
        case SHOW_POPUP_TYPE:
            return { 
                ...state,
                popup: payload,
            };

        case HIDE_POPUP_TYPE:
            return { 
                ...state,
                popup: null,
            };

      default:
        return state;
    }
}