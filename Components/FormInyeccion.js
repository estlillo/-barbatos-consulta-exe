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
import React from "react";

import { Controller, FormProvider, useForm } from "react-hook-form";
import useObtenerData from "@/customHooks/useObtenerData";
import SelectForm from "@/components/SelectForm";
import TextFieldForm from "@/components/TextFieldForm";

import MultipleUsers from "@/components/MultipleUsers";
import useInyectarDocumento from "@/customHooks/useInyectarDocumento";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import DateCustomPicker from "@/components/DatePicker";
import useTiposDocumento from "@/customHooks/useTiposDocumento";
import SelectFormFormatoDocumento from "@/components/SelectFormFormatoDocumento";

const importJodit = () => import('jodit-react');

import dynamic from 'next/dynamic';

const JoditEditor = dynamic(importJodit, {
    ssr: false,
});

export default function FormInyeccion() {
  const [data, setData] = React.useState(null);
  const [labelProceso, setLabelProceso] = React.useState(
    "Documento sin proceso"
  );
  const [formatoSeleccionado, setFormatoSeleccionado] = React.useState(null);

  const [isProceso, setIsProceso] = React.useState(false);

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
  const [isLoading, resultado, error] = useInyectarDocumento(data);

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
                Datos del Expediente
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="emisorExpediente"
                name="emisorExpediente"
                inputLabel="Emisor Expediente"
                helper="Escribe el emisor del expediente"
                register={register}
                errors={errors}
                rules={{
                  required: "Campo emisor del expediente es obligatorio",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="destinatarioExpediente"
                name="destinatarioExpediente"
                inputLabel="Destinatario del Expediente"
                helper="Escribe el destinatario del expediente"
                register={register}
                errors={errors}
                rules={{
                  required: "Campo destinatario del expediente es obligatorio",
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="h6" component="h6">
                Datos del Documento
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControlLabel
                margin="normal"
                control={
                  <Switch
                    checked={isProceso}
                    onChange={handleChangeIsProceso}
                  />
                }
                label={labelProceso}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <SelectForm
                inputLabel="Proceso de documento"
                name="procesoDocumento"
                register={register}
                options={procesosDocumento}
                helper="Seleccione el proceso si corresponde"
                disabled={!isProceso}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SelectFormFormatoDocumento
                inputLabel="Formato de documento"
                name="formatoDocumento"
                register={register}
                setFormatoSeleccionado={setFormatoSeleccionado}
                rules={{
                  required: "Campo Formato de documento es obligatorio",
                }}
                errors={errors}
                options={formatosDocumento}
                helper="Seleccione el formato de documento"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SelectForm
                inputLabel="Tipo de documento"
                name="tipoDocumento"
                register={register}
                rules={{ required: "Campo Tipo de documento es obligatorio" }}
                errors={errors}
                options={tiposDocumento}
                helper="Seleccione el tipo de documento"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextFieldForm
                id="autor"
                name="autor"
                inputLabel="Autor"
                helper="Escribe el autor del documento"
                register={register}
                errors={errors}
                rules={{ required: "Campo autor es obligatorio" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldForm
                id="emisor"
                name="emisor"
                inputLabel="Emisor"
                helper="Escribe el emisor del documento"
                register={register}
                errors={errors}
                rules={{ required: "Campo emisor es obligatorio" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldForm
                id="destinatarios"
                name="destinatarios"
                inputLabel="Destinatarios"
                helper="Escribe los destinatarios del documento"
                register={register}
                errors={errors}
                rules={{ required: "Campo destinatarios es obligatorio" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextFieldForm
                id="ciudad"
                name="ciudad"
                inputLabel="Ciudad"
                helper="Escribe la ciudad del documento"
                register={register}
                errors={errors}
                rules={{ required: "Campo ciudad es obligatorio" }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextFieldForm
                id="numeroExterno"
                name="numeroExterno"
                inputLabel="Número externo"
                helper="Escribe el número externo del documento"
                register={register}
                errors={errors}
                rules={{ required: "Campo número externo es obligatorio" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name="fechaDocumento"
                  control={control}
                  inputLabel="Test111"
                  defaultValue={new Date()}
                  placeholder="test test"
                  render={({
                    field: { onChange, value },
                    fieldState: { error, invalid },
                  }) => <DateCustomPicker value={value} onChange={onChange} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="materia"
                name="materia"
                inputLabel="Materia"
                helper="Escribe la materia del documento"
                multiline
                rows={4}
                register={register}
                errors={errors}
                rules={{ required: "Campo materia es obligatorio" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="antecedentes"
                name="antecedentes"
                inputLabel="Antecedentes"
                helper="Escribe los antecedentes del documento"
                multiline
                rows={4}
                register={register}
                errors={errors}
                rules={{ required: "Campo antecedentes es obligatorio" }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              Contenido 
              <br></br>
              <Controller
                name="contenido"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return <JoditEditor editorState={value} onChange={onChange} />;
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MultipleUsers
                nombreLista="visadores"
                label="Visadores de documento"
                register={register}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MultipleUsers
                nombreLista="firmantes"
                label="Firmantes de documento"
                register={register}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MultipleUsers
                nombreLista="distribucion"
                label="Lista de Distribución"
                register={register}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider></Divider>
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
                >
                  Enviar
                </Button>
                <br></br>
                {error &&
                  error.map((err) => (
                    <>
                      <Alert severity="error">{err}</Alert> <br></br>
                    </>
                  ))}

                {isLoading && <div>Cargando...</div>}
                <br></br>
                {resultado && resultado.mensaje && (
                  <Alert severity="success">
                    {"Expediente inyectado correctamenre " + resultado?.mensaje}
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
