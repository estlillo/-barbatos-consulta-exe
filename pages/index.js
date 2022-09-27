import React from "react";

import styles from "@/styles/Home.module.css";
import CardServicio from "@/components/CardServicio";

export default function Home() {
  const [servicios, SetServicios] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/servicios")
      .then((res) => res.json())
      .then((resultado) => {
        SetServicios(resultado);
      });
  }, []);

  return (
    <>
      <h1 className={styles.title}>
        Bienvenido a <a href="#">SocialDoc</a>
      </h1>

      <p className={styles.description}>
        Una extensión para tu gestor documental <strong>SocialDoc</strong>, empieza
        por hacer clic en uno de los servicios que provee{" "}
        <strong>SocialDoc</strong>{" "}
      </p>
      <div className={styles.grid}>
        {servicios.map((servicio, index) => (
          <CardServicio
            key={index}
            title={servicio.title}
            description={servicio.description}
            urlServicio={servicio.urlRedirect}
            active={servicio.active}
          />
        ))}
      </div>
    </>
  );
}
