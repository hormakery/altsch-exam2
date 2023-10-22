export const getPopularRepos = (repos) => {
  const data = repos.filter((e) => e.description && e.language).slice(0, 6);
  return data.length ? data : repos.slice(0, 6);
};
