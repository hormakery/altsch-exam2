import { BiStar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import styles from "./style.module.css"; // Import css modules stylesheet as styles

export default function Repository(repo) {
  const navigation = useNavigate();

  return (
    <div
      className={styles.container}
      onClick={() => navigation(`/repositories/${repo.name}`, { state: repo })}
    >
      <div className={styles.title}>
        <h1>{repo.name}</h1>
        <h1>{repo.visibility}</h1>
      </div>

      {repo.description && <p>{repo.description}</p>}

      <div className={styles.bottom}>
        {repo.language ? (
          <div>
            <span />
            <p>{repo.language}</p>
          </div>
        ) : null}

        {repo.stargazers_count ? (
          <div>
            <BiStar />
            <p>{repo.stargazers_count}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
