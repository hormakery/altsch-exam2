import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Button from "../../component/button";
import { useRepositories } from "../../hooks";
import RepositoriesList from "../../component/repositories_list";

import styles from "./style.module.css";

export default function Repositories() {
  const { data } = useRepositories();

  // console.log("====================================");
  // console.log(data);
  // console.log("====================================");

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <RepositoriesList title="All repositories" data={data.slice(0, 12)}>
          <div className={styles.paginate_list}>
            <Button disabled onClick={() => {}}>
              <IoIosArrowBack />
              Previous
            </Button>

            <Button onClick={() => {}}>
              Next
              <IoIosArrowForward />
            </Button>
          </div>
        </RepositoriesList>
      </div>
    </div>
  );
}
