import { octokit, useAuthContext } from "../context";

export function useAuth() {
  const { username, clearStore, setStore, ...rest } = useAuthContext();

  const onLogin = async () => {
    try {
      setStore({ isLoading: true });

      const { data } = await (username
        ? octokit.rest.users.getByUsername({ username })
        : octokit.rest.users.getAuthenticated());

      setStore({ user: data });
    } catch (error) {
      setStore({ error });
    } finally {
      setStore({ isLoading: false });
    }
  };

  const onLogout = async () => {
    setStore({ isLoading: true });
    setTimeout(clearStore, 1000);
  };

  const setUsername = (username) => setStore({ username });

  return {
    ...rest,
    onLogin,
    onLogout,
    username,
    setUsername,
  };
}
