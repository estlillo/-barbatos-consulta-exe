import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import DateFormated from "@/components/DateFormated";
import DialogViewPDF from "@/components/DialogViewPDF";

export default function DocumentoContent({ documento }) {
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState([""]);
  const [nombreArchivo, setNombreArchivo] = React.useState("");
  const [contentType, setContentType] = React.useState("");

  const handleClickOpen = (url,nombreArchivo,contentType) => {  
    setUrl(url);
    setNombreArchivo(nombreArchivo);
    setContentType(contentType);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };

  return (
    <>
      {documento && (
        <Card
          sx={{
            minWidth: "100%",
            maxWidth: 700,
            padding: "1rem",
            margin: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "left",
          }}
        >
          <CardHeader
            title={documento.tipoDocumento + " N° " + documento.numero}
            subheader={
              <DateFormated date={documento.fecha} preTexto="Creado" />
            }
          />
          <Divider />
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="top">
              <Typography variant="body2">
                <strong>Tipo de documento:</strong>
              </Typography>
              <Typography variant="subtitle2">
                {documento.tipoDocumento}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="top">
              <Typography variant="body2">
                <strong>Número de documento:</strong>
              </Typography>
              <Typography variant="subtitle2">{documento.numero}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="top">
              <Typography variant="body2">
                <strong>Fecha:</strong>
              </Typography>
              <Typography variant="subtitle2">{documento.fecha}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="top">
              <Typography variant="body2">
                <strong>Formato:</strong>
              </Typography>
              <Typography variant="subtitle2">
                {documento.formatoDocumento}
              </Typography>
            </Stack>
           

            <Stack direction="row" spacing={1} alignItems="top">
              <Typography variant="body2">
                <strong>Firmante:</strong>
              </Typography>
              <Typography variant="subtitle2">{(documento.firmantes ?? [])[0]}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="top">
              <Typography variant="body2">
                <strong>Estado:</strong>
              </Typography>
              <Typography variant="subtitle2">{documento.estado}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="top">
              <Typography variant="body2">
                <strong>Materia:</strong>
              </Typography>
              <Typography variant="subtitle2">{documento.materia}</Typography>
            </Stack>

            {documento.dataArchivo && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">
                  <strong>Archivo:</strong>
                </Typography>
                <Button
                  href={"/api/downloadFile/?url=" + encodeURIComponent(documento.dataArchivo)}
                  color="primary"
                  variant="outlined"
                  size="small"
                >
                  Descargar
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  size="small"
                  onClick={() => handleClickOpen(documento.dataArchivo, documento.nombreArchivo, documento.contentType )}
                >
                  Ver
                </Button>
               
              </Stack>
            )}
          </CardContent>
          <DialogViewPDF
            open={open}
            setOpen={setOpen}
            onClose={handleClose}
            notifyError={null}
            url={url}
            nombreArchivo={nombreArchivo}
            contentType={contentType}
          />
        </Card>
      )}
    </>
  );
}
