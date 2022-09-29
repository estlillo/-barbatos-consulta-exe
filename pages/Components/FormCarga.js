import {
  Alert,
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';

import { Controller, FormProvider, useForm } from "react-hook-form";
import useObtenerData from "@/customHooks/useObtenerData";
import SelectForm from "@/components/SelectForm";
import TextFieldForm from "@/components/TextFieldForm";
import { Dialog } from 'primereact/dialog';
import MultipleUsers from "@/components/MultipleUsers";
import useInyectarDocumento from "@/customHooks/useInyectarDocumento";
import useLeerExcel from "@/customHooks/useLeerExcel";



import DateCustomPicker from "@/components/DatePicker";
import useTiposDocumento from "@/customHooks/useTiposDocumento";
import SelectFormFormatoDocumento from "@/components/SelectFormFormatoDocumento";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const importJodit = () => import('jodit-react');

import dynamic from 'next/dynamic';

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});
const handleSubmission = () => {
};
export default function FormInyeccion() {
  const [data, setData] = React.useState(null);
  const [labelProceso, setLabelProceso] = React.useState(
    "Documento sin proceso"
  );
  const [formatoSeleccionado, setFormatoSeleccionado] = React.useState(null);

  const [isProceso, setIsProceso] = React.useState(false);
  const chooseOptions = { label: 'Subir', icon: 'pi pi-fw pi-plus' };
  const [tiposDocumento, errorTd] = useTiposDocumento({
    url: "/api/servicios/tiposDocumento",
    formato: formatoSeleccionado,
  });
  const [formatosDocumento, loadingFd, errorFd] = useObtenerData({
    url: "/api/servicios/formatosDocumento",
  });
  const [procesosDocumento, loadingPd, errorPd] = useObtenerData({
    url: "/api/servicios/procesosDocumento",
  });

  const handleChangeIsProceso = (event) => {
    setIsProceso(event.target.checked);
    if (event.target.checked) {
      setLabelProceso("Documento con proceso");
    } else {
      setLabelProceso("Documento sin proceso");
    }
  };



  const methods = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {}, // Apparently `defaultValues` being null is a DEAL BREAKER!
    shouldFocusError: true, // focus input field after submit if it is not following required rule of input field
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [isLoading, resultado, error] = useLeerExcel(data);

  const sendToApi = (data) => {
    console.log(data);
    setData(data);
  };


  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(sendToApi)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Typography variant="h6" component="h6">
                Configurar Expediente
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="emisorExpediente"
                name="emisorExpediente"
                inputLabel="Emisor"
                helper="Escriba quien emite el expediente"
                register={register}
                errors={errors}
                rules={{
                  required: "Campo Emisor es obligatorio",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="destinatarioExpediente"
                name="destinatarioExpediente"
                inputLabel="Destinatario"
                helper="Escriba quien recibirá el expediente"
                register={register}
                errors={errors}
                rules={{
                  required: "Campo Destinatario es obligatorio",
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="h6" component="h6">
                Configurar Ruta
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="rutaExpediente"
                name="rutaExpediente"
                inputLabel="Ruta"
                helper="Escriba la ruta recibirá donde están los expedientes (Ej:https://www.web.cl/archivoshistoricos/)"
                register={register}
                errors={errors}
                rules={{
                  required: "La ruta es obligatoria",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <br />
              <Button
                variant="contained"

                disabled={isLoading}
              >
                Validar directorio
              </Button>

            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="h6" component="h6">
                Configurar Excel
              </Typography>
              <Divider />
            </Grid>


            <Grid item xs={12} md={6}>
              <br />
              <FileUpload name="archivoExcel" id="archivoExcel" url="api/leerExcel"
                mode="basic"
                chooseOptions={chooseOptions}
                register={register}
                errors={errors}
                rules={{
                  required: "La ruta es obligatoria",
                }}
              ></FileUpload>
            </Grid>


            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "1rem",
                }}
              >

                <Button
                  variant="contained"
                  type="submit"
                  disabled={isLoading}
                  endIcon={<SendIcon />}
                  onClick={handleSubmission}
                >
                  Ejecutar carga
                </Button>

                <br></br>

                {error &&
                  error.map((err) => (
                    <>
                      <Alert severity="error">{err}</Alert> <br></br>
                    </>
                  ))}


                {resultado && <div>{resultado}</div>}
                <br></br>
                {resultado && resultado.mensaje && (
                  <Alert severity="success">
                    {"Excel inyectado correctamenre "}
                  </Alert>

                )}
              </Box>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
}
