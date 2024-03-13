/**
 * @file DataContext.js
 * @description Provides a context for managing global data within a React application.
 * @author @Tarak1246
 */
/**
 * @module DataContext
 */

/**
 * @module react
 * @description Core library for building user interfaces with React.
 */
import React, { createContext, useReducer, useContext } from "react";

/**
 * @description Initial state for the data context.
 */
const initialState = {
  /**
   * @type {null | any}
   * @description Holds the application data. Initially set to null.
   */
  data: null,
};
/**
 * @typedef DataAction
 * @property {string} type - The type of action to be performed.
 * @property {*} payload - The data to be updated (optional).
 */

/**
 * @typedef DataState
 * @property {*} data - The current application data.
 */

/**
 * @function dataReducer
 * @description A reducer function to handle state updates for the DataContext.
 * @param {DataState} state - The current state of the context.
 * @param {DataAction} action - The action object to be processed.
 * @returns {DataState} The updated state.
 */
const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

/**
 * @description Creates a React context for managing data state.
 */
const DataContext = createContext();

/**
 * @function DataProvider
 * @description A React component that provides the DataContext to its children.
 * @param {React.ReactNode} children - The child components that will consume the context.
 * @returns {JSX.Element} The Provider component wrapping the children.
 */
export const DataProvider = ({ children }) => {
  /**
   * @description Manages the DataContext state using a reducer.
   * @type [{ data: * }, React.Dispatch<DataAction>]
   */
  const [state, dispatch] = useReducer(dataReducer, initialState);

  /**
   * @function setDataa
   * @description An action creator to update the data in the context.
   * @param {*} data - The new data to be set.
   */
  const setDataa = (data) => {
    dispatch({ type: "SET_DATA", payload: data });
  };
  /**
   * @description Renders the DataContext.Provider component, making the context accessible to child components.
   * @returns {JSX.Element} The DataContext.Provider component wrapping the children.
   */
  return (
    <DataContext.Provider value={{ state, setDataa }}>
      {children}
    </DataContext.Provider>
  );
};

/**
 * @function useData
 * @description A custom hook to consume the DataContext within other components.
 * @returns {{ data: *, setDataa: React.Dispatch<DataAction> }} The state and action dispatch function from the context.
 */
export const useData = () => {
  return useContext(DataContext);
};