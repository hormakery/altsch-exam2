import { useMemo, useState, createContext } from "react";

const defaultState = {
  data: [], // the authenticated user repositories
  error: null, // when there was an error getting user repositories we can display this error on the UI
  isLoading: false, // when user is fetching his/her we use this state to update loading buttons etc
};

export const Context = createContext({
  ...defaultState,
  setStore: () => {},
  clearStore: () => {},
});

export default function RepoContext({ children }) {
  const [state, setState] = useState(defaultState);

  const setStore = (data) => setState((prev) => ({ ...prev, ...data }));

  const clearStore = () => setState(defaultState);

  const store = useMemo(
    () => ({ ...state, isError: state.error !== null, setStore, clearStore }),
    [state]
  );

  return <Context.Provider value={store}>{children}</Context.Provider>;
}
