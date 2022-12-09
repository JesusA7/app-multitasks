import { useEffect, useState } from "react";
import {
  onAuthStateChangedToUser,
  addDataPurchase,
  updateDataPurchase,
} from "../../firebase/client";
import home from "../../styles/Home.module.css";
import { user } from "../../interfaces/user";
import Image from "next/image";
import login from "../../styles/Login.module.css";
import button from "../../styles/Button.module.css";
import { IPurchase, IPurchaseDetail } from "../../interfaces/utilsRobert";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<user>();
  useEffect(() => {
    onAuthStateChangedToUser(setUser);
  }, []);

  const handleClickNew = () => {
    router.push("/home/purchaseform");
  };
  return (
    <div className={home.container}>
      <div>
        <header className={home.header}>
          <div>
            <Image
              className={login.avatar}
              src={user?.avatar as string}
              width={32}
              height={32}
              alt=""
            />
            <strong>{user?.userName}</strong>
          </div>
          <div className={home.containerBtnNew}>
            <button className={button.Button} onClick={handleClickNew}>
              Nuevo
            </button>
          </div>
        </header>
        <section className={home.section}>
          <div className={home.card}>
            <div>Cuerpo</div>
          </div>
        </section>
        <nav className={home.nav}>Navegacion</nav>
      </div>
    </div>
  );
}
