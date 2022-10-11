import React from "react";

import styles from "@/styles/Home.module.css";
import CardServicio from "@/components/CardServicio";

export default function DocumentosEspecificos() {
  const [serviciosEspecificos, SetServiciosEspecificos] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/serviciosEspecificos")
      .then((res) => res.json())
      .then((resultado) => {
        SetServiciosEspecificos(resultado);
      });
  }, []);

  return (
    <>
      <h1 className={styles.title}>
        Inyección de documentos específicos
      </h1>

      <p className={styles.description}>
        Por favor, escoge uno de los siguientes documentos para inyectar a <strong>ExeDOC</strong>{" "}
      </p>
      <div className={styles.grid}>
        {serviciosEspecificos.map((servicio, index) => (
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
