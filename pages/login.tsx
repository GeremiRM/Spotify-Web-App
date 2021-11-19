import { NextPage } from "next";
import styles from "../styles/Login.module.scss";

import LOGIN_URL from "../spotify";

const Login: NextPage = ({}) => {
  return (
    <div className={styles.login}>
      <div>
        <a href={LOGIN_URL}>
          <button className={styles.login__btn}>Login to spotify</button>
        </a>
      </div>
    </div>
  );
};

export default Login;
