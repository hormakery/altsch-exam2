import { GoPeople } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineMail } from "react-icons/ai";
import { BiBuildingHouse } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";

import styles from "./style.module.css"; // Import css modules stylesheet as styles

export default function Profile({ user }) {
  return (
    <div className={styles.container}>
      <LazyLoadImage effect="blur" alt="user avatar" src={user.avatar_url} />

      <div className={styles.name}>
        <h1>{user.name}</h1>
        <h3>{user.login}</h3>
      </div>

      {user.bio && <p className={styles.bio}>{user.bio}</p>}

      <div className={styles.followers}>
        <span>
          <GoPeople size={14} />
          <p>{user.followers}</p>
          <p>followers</p>
        </span>

        <p>•</p>

        <span>
          <p>{user.following}</p>
          <p>following</p>
        </span>
      </div>

      <div className={styles.address}>
        {user.company && (
          <span>
            <BiBuildingHouse size={20} />
            <p>{user.company}</p>
          </span>
        )}

        {user.location && (
          <span>
            <SlLocationPin size={18} />
            <p>{user.location}</p>
          </span>
        )}

        {user.email && (
          <span>
            <AiOutlineMail size={18} />
            <p>{user.email}</p>
          </span>
        )}
      </div>
    </div>
  );
}
