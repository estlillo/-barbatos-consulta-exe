import React from "react";
import styles from "@/styles/Home.module.css";
import { Box, Button, Stack, Typography } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export default function ObservacionContent({ texto, adjuntadoPor, dataUrl }) {

  if(!texto) texto = "";
  if(!adjuntadoPor) adjuntadoPor = "";
  if(!dataUrl) dataUrl = "";

  return (
    <>
      <Box sx={{ padding: "1rem" }}>
        <Stack direction="row" spacing={1} alignItems="top">
          <Typography variant="body2">
            <strong>Observación:</strong>
          </Typography>
          <Typography variant="subtitle2">{texto}</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="top">
          <Typography variant="body2">
            <strong>Autor:</strong>
          </Typography>
          <Typography variant="subtitle2">
            {adjuntadoPor}
          </Typography>
        </Stack>

        {dataUrl && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">
              <strong>Adjunto:</strong>
            </Typography>
            <Button
              href={dataUrl}
              color="primary"
              variant="outlined"
              size="small"
              endIcon={<CloudDownloadIcon />}
            >
              Descargar
            </Button>
          </Stack>
        )}
      </Box>
    </>
  );
}
