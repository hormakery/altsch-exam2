import { useMemo, useState, createContext } from "react";

const defaultState = {
  username: "",
  user: null, // the authenticated user
  error: null, // when there was an error logging user, we can display this error on the UI
  isLoading: false, // when user is logging we use this state to update loading buttons etc
};

export const Context = createContext({
  ...defaultState,
  setStore: () => {},
  clearStore: () => {},
});

export default function AuthContext({ children }) {
  const [state, setState] = useState(defaultState);

  const setStore = (data) => setState((prev) => ({ ...prev, ...data }));

  const clearStore = () => setState(defaultState);

  const store = useMemo(
    () => ({
      ...state,
      setStore,
      clearStore,
      isError: state.error !== null,
      isAuthenticated: state.user !== null,
    }),
    [state]
  );

  return <Context.Provider value={store}>{children}</Context.Provider>;
}
