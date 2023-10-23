import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { BiGitBranch } from "react-icons/bi";
import { FaFolder, FaRegFile } from "react-icons/fa";
import { Outlet, useLocation } from "react-router-dom";
import { CgTimer, CgSpinner, CgClose } from "react-icons/cg";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useRepoContents } from "../../hooks";
import styles from "./style.module.css"; // Import css modules stylesheet as styles

export default function Repository() {
  const { state } = useLocation();
  const { isLoading, readme, contents } = useRepoContents(state);

  return (
    <div className={styles.container}>
      <Outlet />

      <div className={styles.content}>
        <div className={styles.title_wrapper}>
          <LazyLoadImage
            effect="blur"
            alt="user avatar"
            src={state.owner.avatar_url}
          />
          <h1>{state.name}</h1>
          <h1>{state.visibility}</h1>
        </div>

        {state.description ? (
          <div className={styles.branch}>
            <span>
              <BiGitBranch size={18} />
            </span>
            <div>
              <h1>Project Description</h1>
              <h3>{state.description}</h3>
            </div>
          </div>
        ) : null}

        {isLoading && (
          <div className={styles.repo_readme}>
            {isLoading && <CgSpinner size={30} className="icon-spinner" />}
          </div>
        )}

        {contents ? (
          <div className={styles.all_commits}>
            <div className={styles.commits}>
              <div className={styles.commit_header}>
                <LazyLoadImage
                  effect="blur"
                  alt="user avatar"
                  className={styles.avatar}
                  src={state.owner.avatar_url}
                />
                <strong>{state.owner.login}</strong>
                <p className={styles.link}>
                  Merge pull request #27 from admin-sixteen/feat-analytics
                </p>
              </div>

              <div className={styles.commit_time}>
                <CgClose color="red" />

                <p className={styles.link}>da166fb</p>

                <p className={styles.link}>2 days ago</p>

                <CgTimer size={22} />
                <strong>
                  226 <span>commits</span>
                </strong>
              </div>
            </div>

            {contents.map((content) => (
              <div key={content.name} className={styles.folders}>
                <div className={styles.commit_header}>
                  {content.type === "file" && (
                    <FaRegFile className={styles.icons} />
                  )}

                  {content.type === "dir" && (
                    <FaFolder className={styles.icons} />
                  )}

                  <h3>{content.name}</h3>
                </div>
                <p className={styles.link}>add fix to signup screens</p>
                <h3>4 months ago</h3>
              </div>
            ))}
          </div>
        ) : null}

        {readme ? (
          <div className={styles.repo_readme}>
            <h3>README.md</h3>

            <Markdown remarkPlugins={[remarkGfm]} className={styles.markdown}>
              {readme}
            </Markdown>
          </div>
        ) : null}
      </div>
    </div>
  );
}