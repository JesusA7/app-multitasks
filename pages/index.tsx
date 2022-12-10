/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import LogoGoogle from "../icons/LogoGoogle";
import login from "../styles/Login.module.css";
import button from "../styles/Button.module.css";
import { useEffect, useState } from "react";
import { LoginWithGoogle, onAuthStateChangedToUser } from "../firebase/client";
import { useRouter } from "next/router";
import { user } from "../interfaces/user";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState<user>();

  useEffect(() => {
    onAuthStateChangedToUser(setUser);
  }, []);

  useEffect(() => {
    user && router.replace("/home");
  }, [router, user]);
  
  const handleClick = async () => {
    setUser(await LoginWithGoogle());
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className={login.main}>
        <div className={login.container}>
          <div>
            <h1 className={login.title}>Economía Universal!!!</h1>
            <h2 className={login.description}>
              Conoce más acerca del mundo de la economía y las finanzas 🪙
            </h2>
            <div className={login.containerButton}>
              {user === undefined ? (
                <button className={button.Button} onClick={handleClick}>
                  <LogoGoogle width={16} height={16} /> Iniciar sesión con
                  Google
                </button>
              ) : (
                <>
                  <Image
                    className={login.avatar}
                    src={user.avatar as string}
                    alt=""
                    width={32}
                    height={32}
                  />
                  <div>{user.userName}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
