import { CgSpinner } from "react-icons/cg";

import { useAuth } from "../../hooks";
import Profile from "../../component/profile";
import Repository from "../../component/repository";

import styles from "./style.module.css";

export default function RepositoriesList({ data, isLoading, title, children }) {
  const { user } = useAuth();

  return (
    <div className={styles.auth_content}>
      <Profile user={user} />

      {data.length ? (
        <div className={styles.repo_content}>
          <h3>{title}</h3>

          <div className={styles.repo_content_list}>
            {data.map((repo) => (
              <Repository key={repo.id} {...repo} />
            ))}
          </div>

          {children}
        </div>
      ) : null}

      {!data.length && isLoading ? (
        <div className={styles.loading_repo_content}>
          <CgSpinner size={40} className="icon-spinner" />
        </div>
      ) : null}
    </div>
  );
}
