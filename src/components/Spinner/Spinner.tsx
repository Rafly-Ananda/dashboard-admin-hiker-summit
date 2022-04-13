import styles from "./spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
