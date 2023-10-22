import { Outlet, useLocation, Link } from "react-router-dom";
import { CgTimer, CgClose } from "react-icons/cg";
import { FaFolder, FaRegFile } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";

import styles from "./style.module.css"; // Import css modules stylesheet as styles

export default function Repository() {
  const { state } = useLocation();

  return (
    <div className={styles.container}>
      <Outlet />
      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          <LazyLoadImage
            effect="blur"
            alt="user avatar"
            className={styles.avatar}
            src={state.owner.avatar_url}
          />
          <strong>E-commerceWebsite</strong>
        </div>
        <div className={styles.branch}>
          <h3>
            This branch is up to date with lassiecoder/E-CommerceWebsite:master.
          </h3>
        </div>

        <div className={styles.allCommits}>
          <div className={styles.commits}>
            <div className={styles.commitHeader}>
              <LazyLoadImage
                effect="blur"
                alt="user avatar"
                className={styles.avatar}
                src={state.owner.avatar_url}
              />
              <strong>josemak25</strong>
              <Link to="/" className={styles.link}>
                Merge pull request #27 from admin-sixteen/feat-analytics
              </Link>
            </div>

            <div className={styles.commitTime}>
              <CgClose color="red" />

              <Link to="/" className={styles.link}>
                da166fb
              </Link>

              <Link to="/" className={styles.link}>
                2 days ago
              </Link>

              <CgTimer size={22}/>
              <strong >
                226 <span>commits</span>
              </strong>
            </div>
          </div>

          <div className={styles.folders}>
            <div className={styles.commitHeader}>
              <FaFolder className={styles.icons} />
              <h3>__test__</h3>
            </div>

            <Link to="/" className={styles.link}>
              add fix to signup screens
            </Link>

            <h3>4 months ago</h3>
          </div>

          <div className={styles.folders}>
            <div className={styles.commitHeader}>
              <FaRegFile className={styles.icons} />
              <h3>.gitignore</h3>
            </div>

            <Link to="/" className={styles.link}>
              add fix to app local cache
            </Link>

            <h3>4 months ago</h3>
          </div>

          <div className={styles.folders}>
            <div className={styles.commitHeader}>
              <FaRegFile className={styles.icons} />
              <h3>.gitignore</h3>
            </div>

            <Link to="/" className={styles.link}>
              add fix to app local cache
            </Link>

            <h3>4 months ago</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
