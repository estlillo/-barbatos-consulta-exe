import React from "react";
import styles from "@/styles/Home.module.css";
import { Box, Typography } from "@mui/material";

import FormInyeccion from "@/components/FormInyeccion";

export default function Inyectar() {
  return (
    <>
      <h1 className={styles.title}>Inyección de documentos</h1>
      <Typography variant="h6" component="h6">
        Aquí podrás realizar inyección de todo tipo de documentos al gestor
        documental
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "xl",
        }}
      >
        <FormInyeccion />
      </Box>
    </>
  );
}
