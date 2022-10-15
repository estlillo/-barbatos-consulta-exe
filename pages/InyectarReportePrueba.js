import React from "react";
import styles from "@/styles/Home.module.css";
import { Box, Typography } from "@mui/material";

import FormInyeccion from "@/components/InyeccionReporte/FormInyeccion";
import FormInyeccionPrueba from "./Components/InyeccionReporte/FormInyeccionPrueba";

export default function InyectarReportePrueba() {
  return (
    <>
      <h1 className={styles.title}>Inyección reporte denuncia Prueba</h1>
      <br></br>
      <br></br>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "xl",
        }}
      >
        <Typography variant="h6" component="h6">
          Bienvenido a Confía en DISAL, Sistema Ético operado por EthicsGlobal,
          informe a su organización sobre cualquier incumplimiento al Código de
          Ética y Conducta de DISAL. Ingrese su reporte a través del asiste web
          o bien, comuníquese de manera gratuita a los siguientes teléfonos:{" "}
          <strong>
            Chile 800-914-501 Paraguay 009-800-542-0164 Perú +51 1705-2233
          </strong>
          
        </Typography>
        <br></br>
        <br></br>

        <FormInyeccionPrueba />
      </Box>
    </>
  );
}
