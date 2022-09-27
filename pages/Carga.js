import React from "react";
import styles from "@/styles/Home.module.css";
import { Box, Typography } from "@mui/material";

import FormCarga from "./Components/FormCarga";

export default function Carga() {
  return (
    <>
    <h1 className={styles.title}>Carga de documentos</h1>
    <Typography variant="h6" component="h6">
      Aquí se cargan los documentos historicos en el gestor documental.
    </Typography>
    <br/>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "xl",
      }}
    >
      <FormCarga />
    </Box>
  </>
);
}
