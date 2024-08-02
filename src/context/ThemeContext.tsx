"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useReducer } from "react";


const initialTheme: ThemeState = {
    theme: "beach",
    isSettingsOpen: false,
    showDisclaimer: true,
    isMobile: false,
    hamburgerMenuPosition: "right",
};

interface ThemeState {
    theme: string;
    isSettingsOpen: boolean;
    showDisclaimer: boolean;
    isMobile: boolean;
    hamburgerMenuPosition: string;
}

interface ThemeAction {
    type: 'CHANGE_THEME' | 'TOGGLE_SETTINGS' | 'SHOW_DISCLAIMER' | 'TOGGLE_MOBILE' | 'SET_HAMBURGER_POSITION';
    payload?: any;
}

const ThemeContext = createContext<ThemeState | null>(null);
const ThemeDispatchContext = createContext<React.Dispatch<ThemeAction> | null>(null);


export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(themeReducer, initialTheme);


    return (
        <ThemeContext.Provider value={ state }>
            <ThemeDispatchContext.Provider value = {dispatch}>
            <div data-theme={state.theme} className="App">
            {children}
            </div>
            </ThemeDispatchContext.Provider>
        </ThemeContext.Provider>
    );
};


//custom hook to get context from wherever in the tree
export function useTheme() {
    return useContext(ThemeContext);
}
//this is a nice custom hook to change context from wherever in the tree.
export function useThemeDispatch() {
    return useContext(ThemeDispatchContext);
}


function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
    switch (action.type) {
      case 'CHANGE_THEME':
        return {
          ...state,
          theme: action.payload,
        };
      case 'TOGGLE_SETTINGS':
        return {
          ...state,
          isSettingsOpen: !state.isSettingsOpen,
        };
      case 'SHOW_DISCLAIMER':
        return {
          ...state,
          showDisclaimer: !state.showDisclaimer,
        };
      case 'TOGGLE_MOBILE':
        return {
          ...state,
          isMobile: action.payload,
        };
      case 'SET_HAMBURGER_POSITION':
        if (typeof action.payload === 'string') {
          return {
            ...state,
            hamburgerMenuPosition: action.payload,
          };
        }
        return state;
  
      default:
        throw Error('Unknown action: ' + action.type);
    }
  }
  
  