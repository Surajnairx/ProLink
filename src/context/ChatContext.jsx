// Create a context for the chat, to be used in other components
import { createContext, useReducer } from "react";

// Define the ChatContext, this will be used to share state across the app
export const ChatContext = createContext();

// ChatContextProvider component will wrap the app and provide state to its children
export const ChatContextProvider = ({ children }) => {
  // Define the initial state for the chat
  const INITIAL_STATE = {
    chatId: "null", // Initial chat ID is set to "null", indicating no active chat
    user: {}, // Initial user is an empty object
  };

  // Reducer function that will handle the actions and update the state
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        // If the action type is CHANGE_USER, return new state with updated chatId and user
        return {
          chatId: action.payload[0], // First item in payload is the new chatId
          user: action.payload[1].userInfo, // Second item in payload contains userInfo
        };

      default:
        // For any unknown action types, just return the current state
        return state;
    }
  };

  // UseReducer hook to manage the state of the chat
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  // Provide the state and dispatch function to all child components via context
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
