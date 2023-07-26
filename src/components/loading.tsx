import { useContext } from "react";
import loadingSvg from "../assets/loading.svg";
import styles from "../styles/components/loading.module.css";
import { LoadingContext } from "../contexts/components/loading.context";

export default () => {
  const { loadingDisplay } = useContext(LoadingContext);
  return (
    <div className={styles.loading} style={{ display: loadingDisplay }}>
      <img src={loadingSvg} alt="" />
    </div>
  );
};
