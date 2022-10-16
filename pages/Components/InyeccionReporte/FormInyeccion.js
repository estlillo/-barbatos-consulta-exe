import { Alert, Box, Button, Divider, Grid, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";

import { Controller, FormProvider, useForm } from "react-hook-form";
import useObtenerData from "@/customHooks/useObtenerData";
import SelectForm from "@/components/SelectForm";
import TextFieldForm from "@/components/TextFieldForm";

const importJodit = () => import("jodit-react");

import dynamic from "next/dynamic";
import MultipleUsersImplicados from "../MultipleUsersImplicados";
import useInyectarReporteDenuncia from "@/customHooks/useInyectarReporteDenuncia";
import FileUploadFieldForm from "../FileUploadFieldForm";
import axios from "axios";

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

export default function FormInyeccion() {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const [data, setData] = React.useState(null);
  const [labelProceso, setLabelProceso] = React.useState("No");
  const [formatoSeleccionado, setFormatoSeleccionado] = React.useState(null);

  const [isProceso, setIsProceso] = React.useState(false);

  const [relacionEmpresaOptions, loadingRe, errorRe] = useObtenerData({
    url: "/api/servicios/relacionEmpresaOptions",
  });

  const [envioReporteOptions, loadingEr, errorEr] = useObtenerData({
    url: "/api/servicios/envioReporteOptions",
  });

  const [unidadDeNegocioOptions, loadingUn, errorUn] = useObtenerData({
    url: "/api/servicios/unidadDeNegocioOptions",
  });

  const [tipoDenunciaOptions, loadingTde, errorTde] = useObtenerData({
    url: "/api/servicios/tipoDenunciaOptions",
  });

  const [lineaDenunciaOptions, loadingLd, errorLd] = useObtenerData({
    url: "/api/servicios/lineaDenunciaOptions",
  });

  const handleChangeIsProceso = (event) => {
    setIsProceso(event.target.checked);
    if (event.target.checked) {
      setLabelProceso("Sí");
    } else {
      setLabelProceso("No");
    }
  };

  const [pdf, setPdf] = React.useState("");

  const methods = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      archivos: [],
    }, // Apparently `defaultValues` being null is a DEAL BREAKER!
    shouldFocusError: true, // focus input field after submit if it is not following required rule of input field
  });

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [isLoading, resultado, error] = useInyectarReporteDenuncia(data);

  const sendToApi = async (data) => {
/*
    console.log("inicio files")

    console.log(data.picture[0].name);
    setPdf(data.picture[0].name);

    setValue("archivos", pdf);

    console.log("data nueva");
    console.log(data);

    await uploadFileToS3(data.picture)
*/
    setData(data);


  };

  const uploadFileToS3 = async (file, index) => {
    console.log("UPLOADING FILE "+index);
    const formData = new FormData();
    formData.append("file", file);
    const result = await axios.post(
      "http://localhost:3001/api/files",
      formData
    );

    console.log("FINISH UPLOADING FILE "+index);

    return result;
  };


  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(sendToApi)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Typography variant="h6" component="h6">
                Información del denunciante
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              <SelectForm
                inputLabel="Relación con la empresa"
                name="relacionConEmpresa"
                register={register}
                options={relacionEmpresaOptions}
                helper="Seleccione el proceso si corresponde"
                disabled={false}
                rules={{
                  required: "Campo obligatorio",
                }}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="comoSeDioCuena"
                name="comoSeDioCuena"
                inputLabel="¿Cómo se dio cuenta?"
                helper="¿Cómo se dio cuenta?"
                register={register}
                errors={errors}
                rules={{
                  required: "Campo obligatorio",
                }}
              />
            </Grid>

            <Divider />

            <Grid item xs={12} md={6}>
              <SelectForm
                inputLabel="¿Cómo desea enviar su reporte?"
                name="comoDeseaEnviarReporte"
                register={register}
                options={envioReporteOptions}
                helper="Seleccione el proceso si corresponde"
                disabled={false}
                rules={{
                  required: "Campo obligatorio",
                }}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="correoElectronico"
                name="correoElectronico"
                inputLabel="Correo electrónico"
                helper="Escribe el correo electrónico"
                register={register}
                errors={errors}
                rules={{ required: "Campo correo electrónico obligatorio" }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="h6" component="h6">
                Lugar de los hechos
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} md={12}>
              <SelectForm
                inputLabel="Unidad de negocio"
                name="unidadNegocio"
                register={register}
                options={unidadDeNegocioOptions}
                helper="Seleccione unidad de negocio"
                disabled={false}
                rules={{
                  required: "Campo obligatorio",
                }}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="dondeSucedieronLosHechos"
                name="dondeSucedieronLosHechos"
                inputLabel="¿Dónde sucedieron los hechos?"
                helper="Ejemplo: Oficina, Planta, Bodega, Estacionamiento, etc."
                register={register}
                errors={errors}
                rules={{ required: "Campo obligatorio" }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="haceCuantoSucedieronLosHechos"
                name="haceCuantoSucedieronLosHechos"
                inputLabel="¿Hace cuánto sucedieron los hechos?"
                helper="Indique el tiempo aproximado"
                register={register}
                errors={errors}
                rules={{ required: "Campo obligatorio" }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="horaAproximada"
                name="horaAproximada"
                inputLabel="Hora aproximada"
                helper="Indique la hora aproximada"
                register={register}
                errors={errors}
                rules={{ required: "Campo obligatorio" }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="direccionDeLosHechos"
                name="direccionDeLosHechos"
                inputLabel="Dirección de los hechos"
                helper="Indique la dirección de los hechos"
                register={register}
                errors={errors}
                rules={{ required: "Campo obligatorio" }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="h6" component="h6">
                Hechos de la denuncia
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} md={12}>
              <SelectForm
                inputLabel="Seleccione el tipo de denuncia que va a reportar"
                name="tipoDenuncia"
                register={register}
                options={tipoDenunciaOptions}
                helper="Seleccione tipo de denuncia"
                disabled={false}
                rules={{
                  required: "Campo obligatorio",
                }}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <MultipleUsersImplicados
                nombreLista="personasImplicadas"
                label="Agregar a todas las personas implicadas en la denuncia o reporte"
                register={register}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="quienEstaEntereado"
                name="quienEstaEntereado"
                inputLabel="¿Quién más está enterado del problema?"
                helper="Mencione a cualquier persona que esté enterada del problema"
                register={register}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldForm
                id="detalleEvidencia"
                name="detalleEvidencia"
                inputLabel="Detalle si sabe o sospecha dónde se puede conseguir más evidencia de la situación"
                helper="Ejemplo: Video, fotografía, etc."
                register={register}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextFieldForm
                id="descripcionDetalladaDenuncia"
                name="descripcionDetalladaDenuncia"
                inputLabel="Descripción detallada de la denuncia"
                helper="Describa en forma cronológica y lo más detallado posible todos los hechos de la denuncia respondiendo a preguntas como: ¿Qué?, ¿Quién?, ¿Cuándo?, ¿Dónde?, ¿Cómo?, ¿Por qué?, ¿Con quién?, ¿Cuánto?, etc."
                placeholder="Describa en forma cronológica y lo más detallado posible todos los hechos de la denuncia respondiendo a preguntas como: ¿Qué?, ¿Quién?, ¿Cuándo?, ¿Dónde?, ¿Cómo?, ¿Por qué?, ¿Con quién?, ¿Cuánto?, etc."
                multiline
                rows={10}
                register={register}
                errors={errors}
                rules={{ required: "Campo detalle es obligatorio" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectForm
                inputLabel="¿Es la primera vez que utiliza la línea de denuncia ética?"
                name="primeraVezDenunciaEtica"
                register={register}
                options={[
                  { id: "Si", description: "SÍ" },
                  { id: "No", description: "No" },
                ]}
                helper="¿Es la primera vez que utiliza la línea de denuncia ética?"
                disabled={false}
                rules={{
                  required: "Campo obligatorio",
                }}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SelectForm
                inputLabel="¿Cómo se enteró de la línea de denuncia ética?"
                name="comoSeEntero"
                register={register}
                options={lineaDenunciaOptions}
                helper="¿Cómo se enteró de la línea de denuncia ética?"
                disabled={false}
                rules={{
                  required: "Campo obligatorio",
                }}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <FileUploadFieldForm
                register={register}
                name="picture"
                rules={{ required: "Campo obligatorio" }}
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
                  disabled={true}
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
