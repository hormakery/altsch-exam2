import { useEffect, useState } from "react";

import { octokit } from "../context";

const sortByName = (data) => {
  return data.sort((a, b) => {
    const aName = a.name.replace(".", "");
    const bName = b.name.replace(".", "");
    return aName < bName ? -1 : aName > bName ? 1 : 0;
  });
};

export function useRepoContents(repo) {
  const [readme, setReadme] = useState(null);
  const [contents, setContents] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getRepoReadme = async () => {
    try {
      setIsLoading(true);

      const { data } = await octokit.rest.repos.getContent({
        repo: repo.name,
        owner: repo.owner.login,
      });

      const files = data.filter((e) => e.type === "file");
      const directories = data.filter((e) => e.type === "dir");

      setContents([...sortByName(directories), ...sortByName(files)]);

      const readme = data.find((e) => e.name === "README.md");

      if (readme) {
        const response = await fetch(readme.download_url);
        const result = await response.text();
        setReadme(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // get user repo readme file
    getRepoReadme();
  }, []);

  return { readme, contents, isLoading };
}
