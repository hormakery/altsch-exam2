import { CiSearch } from "react-icons/ci";
import { Outlet, Link } from "react-router-dom";
import { MdOutlineClear } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

import Button from "../../component/button";
import { getPopularRepos } from "../../helpers";
import { useAuth, useRepositories } from "../../hooks";
import RepositoriesList from "../../component/repositories_list";

import styles from "./style.module.css";

export default function Home() {
  const repositories = useRepositories();
  const { user, setUsername, onLogin, username, isLoading } = useAuth();

  return (
    <div className={styles.container}>
      <Outlet />

      <div className={styles.content}>
        {user !== null ? (
          <RepositoriesList
            title="Popular repositories"
            data={getPopularRepos(repositories.data)}
          >
            <div className={styles.see_more}>
              <Link to="/repositories">
                See more
                <IoIosArrowForward />
              </Link>
            </div>
          </RepositoriesList>
        ) : (
          <div className={styles.input}>
            {username ? (
              <button className={styles.clear} onClick={() => setUsername("")}>
                <MdOutlineClear />
              </button>
            ) : (
              <CiSearch />
            )}
            <input
              type="text"
              value={username}
              placeholder="Search GitHub username..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              disabled={!username}
              className={styles.submit}
              isLoading={username && isLoading}
              onClick={() => onLogin(username)}
            >
              {username && isLoading ? "search..." : "search"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
