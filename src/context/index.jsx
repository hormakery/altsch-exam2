import { Octokit } from "octokit";
import { useContext as __useContext } from "react";

import AuthContext, { Context as __AuthContext } from "./auth";
import RepoContext, { Context as __RepoContext } from "./repo";

export default function ContextProvider({ children }) {
  return (
    <AuthContext>
      <RepoContext>{children}</RepoContext>
    </AuthContext>
  );
}

export const useRepoContext = () => __useContext(__RepoContext);
export const useAuthContext = () => __useContext(__AuthContext);

export const octokit = new Octokit({
  auth: import.meta.env.VITE_ALT_SCH_GITHUB_TOKEN,
});
