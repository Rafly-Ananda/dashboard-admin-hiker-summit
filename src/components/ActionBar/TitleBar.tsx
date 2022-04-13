import { FC } from "react";
import { useLocation } from "react-router-dom";
import styles from "./scss/titlebar.module.scss";

const TitleBar: FC = () => {
  const { pathname } = useLocation();
  const location = pathname.split("/");
  // const title = location[1][0].toUpperCase() + location[1].substring(1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h1>{location[1]}</h1>
      </div>
      <div className={styles.right}>Admin</div>
    </div>
  );
};

export default TitleBar;
