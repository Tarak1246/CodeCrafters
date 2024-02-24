// DataContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Initial state and reducer function
const initialState = {
  data: null,
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

// Create Context
const DataContext = createContext();

// Create Context Provider
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Actions
  const setDataa = (data) => {
    dispatch({ type: 'SET_DATA', payload: data });
  };

  return (
    <DataContext.Provider value={{ state, setDataa }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to consume the context
export const useData = () => {
  return useContext(DataContext);
};
