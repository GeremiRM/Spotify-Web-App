import { GetServerSideProps } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";

import styles from "../styles/Login.module.scss";

import { AlertMessage } from "../components/Login/AlertMessage";

import { BsSpotify } from "react-icons/bs";

type Providers = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

interface LoginProps {
  providers: Providers;
}

const Login: React.FC<LoginProps> = ({ providers }) => {
  return (
    <div className={styles.login}>
      <AlertMessage />
      <div className={styles.login__logo}>
        <BsSpotify />
      </div>
      <div>
        {Object.values(providers!).map((provider) => (
          <button
            className={styles.login__btn}
            key={provider.id}
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
