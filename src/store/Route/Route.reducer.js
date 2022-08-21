import { ROUTE_TYPE } from './Route.action';

const getRoute = () => {
    const route = window.sessionStorage.getItem('currentRoute');
    return route ? JSON.parse(route) : { currentRoute: { name: '', path: ''} };
}

const initialRouteState = () => ({
    ...getRoute(),
});

const setRoute = (route) => {
    window.sessionStorage.setItem('currentRoute', JSON.stringify({ currentRoute: route }));
}

export const routeReducer = (state = initialRouteState(), action = {}) => {
    const { type, payload } = action;
    
    switch (type) {
        case ROUTE_TYPE:
            setRoute(payload);

            return { 
                ...state,
                currentRoute: payload,
            };
    
      default:
        return state;
    }
}