import { OVERLAY_TYPE } from './Overlay.action';

const initialOverlayState = () => ({
    currentOverlay: '',
});

export const overlayReducer = (state = initialOverlayState(), action = {}) => {
    const { type, payload } = action;
  
    switch (type) {
        case OVERLAY_TYPE:
            return { 
                ...state,
                currentOverlay: payload,
            };
    
      default:
        return state;
    }
}
