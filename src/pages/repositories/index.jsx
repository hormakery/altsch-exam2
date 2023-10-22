import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Button from "../../component/button";
import { useRepositories } from "../../hooks";
import RepositoriesList from "../../component/repositories_list";

import styles from "./style.module.css";

const DEFAULT_PAGINATION = 10;
const DEFAULT_GITHUB_PAGINATION = 30; // default github pagination is 30 per page

export default function Repositories() {
  const [page, setPage] = useState(0);
  const [repositories, setRepositories] = useState([]);
  const { data, total_pages, onGetRepos, ...rest } = useRepositories();

  const repoList = repositories
    .slice()
    .splice(page * DEFAULT_PAGINATION, DEFAULT_PAGINATION);

  const hasPreviousPage = page > 0;
  const hasNextPage = repositories.length < total_pages;

  const loadNext = () => setPage(page + 1);
  const loadPrevious = () => setPage(page - 1);

  useEffect(() => {
    const isOnePageLeft =
      page * DEFAULT_PAGINATION === data.length - DEFAULT_PAGINATION;

    if (isOnePageLeft && hasNextPage) {
      onGetRepos(data.length / DEFAULT_GITHUB_PAGINATION + 1);
    }
  }, [repositories.length, page]);

  useEffect(() => {
    setRepositories(data);
  }, [data.length]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <RepositoriesList {...rest} data={repoList} title="All repositories">
          <div className={styles.paginate_list}>
            <Button disabled={!hasPreviousPage} onClick={loadPrevious}>
              <IoIosArrowBack />
              Previous
            </Button>

            <Button disabled={!hasNextPage} onClick={loadNext}>
              Next
              <IoIosArrowForward />
            </Button>
          </div>
        </RepositoriesList>
      </div>
    </div>
  );
}
