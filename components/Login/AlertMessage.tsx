import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import styles from "./AlertMessage.module.scss";

import { CgClose } from "react-icons/cg";

export const AlertMessage: React.FC<{}> = ({}) => {
  const [displayAlert, setDisplayAlert] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${text} copied`, {
      position: "top-center",
      style: { color: "white", background: "green" },
    });
  };

  useEffect(() => {
    setDisplayAlert(true);
  }, []);

  return (
    <div
      className={styles.alert}
      style={{ display: `${displayAlert ? "block" : "none"}` }}
    >
      <CgClose
        className={styles.alert__close}
        onClick={() => setDisplayAlert(false)}
      />
      <p className={styles.alert__title}>
        Because of Spotify policy, for now, you can only access this app by
        using the following credentials:
      </p>
      <div className={styles.field}>
        <p>User: {process.env.NEXT_PUBLIC_TEST_USER}</p>
        <button onClick={() => handleCopy(process.env.NEXT_PUBLIC_TEST_USER!)}>
          Copy
        </button>
      </div>
      <div className={styles.field}>
        <p>Password: {process.env.NEXT_PUBLIC_TEST_PWD}</p>
        <button onClick={() => handleCopy(process.env.NEXT_PUBLIC_TEST_PWD!)}>
          Copy
        </button>
      </div>
    </div>
  );
};
