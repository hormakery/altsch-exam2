import { useState, useEffect } from "react";
import { GoCode } from "react-icons/go";
import { BsGithub } from "react-icons/bs";
import { HiOutlineBookOpen } from "react-icons/hi";
import { RiGitRepositoryLine } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLocation, matchPath, useNavigate } from "react-router-dom";

import Button from "../button";
import { useAuth } from "../../hooks";
import styles from "./style.module.css"; // Import css modules stylesheet as styles

const tabs = [
  {
    path: "/",
    title: "Overview",
    Icon: HiOutlineBookOpen,
  },
  {
    path: "/repositories",
    title: "Repositories",
    Icon: RiGitRepositoryLine,
    showNumberOfRepositories: true,
  },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const { user, isLoading, username, onLogout, onLogin } = useAuth();

  const totalRepos =
    user?.public_repos +
    (user?.total_private_repos || user?.owned_private_repos || 0);

  useEffect(() => {
    // hide logout modal
    if (visible && !user) {
      setVisible(false);
    }
  }, [visible, user]);

  const { pathname } = location;

  return (
    <div className={`${styles.container} ${user && styles.auth_container}`}>
      <div className={styles.header}>
        <div className={styles.header_me}>
          <BsGithub size={35} />
          <span>
            <h3>{user?.login || "Github"}</h3>
            {user && <h3>{user.name}</h3>}
          </span>
        </div>

        <div className={styles.header_me}>
          <div className={styles.user_avatar}>
            {user && (
              <LazyLoadImage
                effect="blur"
                alt="user avatar"
                src={user.avatar_url}
                onClick={() => setVisible(!visible)}
              />
            )}

            {visible && (
              <div className={styles.logout}>
                <span />
                <Button onClick={onLogout} isLoading={isLoading}>
                  <h3>Logout</h3>
                </Button>
              </div>
            )}
          </div>

          {!user ? (
            <Button
              onClick={() => onLogin()}
              isLoading={!username && isLoading}
            >
              {!username && isLoading ? "Logging in..." : "Continue as me"}
            </Button>
          ) : null}
        </div>
      </div>

      {user ? (
        <div className={styles.header_tabs}>
          {tabs.map(({ Icon, path, title, showNumberOfRepositories }) => (
            <div
              key={title}
              className={[pathname === path && styles.header_tab]}
            >
              <Button onClick={() => navigate(path)}>
                <Icon size={18} />
                {title}

                {totalRepos && showNumberOfRepositories && (
                  <span>{totalRepos}</span>
                )}
              </Button>
            </div>
          ))}

          {matchPath("/repositories/:repositoryId", pathname) ? (
            <div className={styles.header_tab}>
              <Button>
                <GoCode size={18} />
                Code
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
