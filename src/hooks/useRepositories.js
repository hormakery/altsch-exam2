import { useEffect } from "react";

import { useAuth } from "./useAuth";
import { octokit, useRepoContext } from "../context";

export function useRepositories() {
  const { isAuthenticated, username, user } = useAuth();
  const { setStore, clearStore, ...rest } = useRepoContext();

  const onGetRepos = async (page = 1) => {
    try {
      setStore({ isLoading: true });
      const params = { sort: "updated", username, page };

      const { data } = await (username
        ? octokit.rest.repos.listForUser(params)
        : octokit.rest.repos.listForAuthenticatedUser(params));

      setStore({ data: [...rest.data, ...data] });
    } catch (error) {
      setStore({ error });
    } finally {
      setStore({ isLoading: false });
    }
  };

  useEffect(() => {
    // get user repos on successful user login
    if (isAuthenticated && !rest.data.length) {
      onGetRepos();
    }

    // reset store on user logout
    if (!isAuthenticated && rest.data.length) {
      clearStore();
    }
  }, [isAuthenticated, rest.data.length]);

  const totalRepos =
    user?.public_repos +
    (user?.total_private_repos || user?.owned_private_repos || 0);

  return { ...rest, total_pages: totalRepos, onGetRepos };
}
