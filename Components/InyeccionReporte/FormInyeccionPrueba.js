import React from "react";
import { Alert, Divider, Grid, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormikProvider, useFormik } from "formik";

import styles from "@/styles/Home.module.css";

import useObtenerData from "@/customHooks/useObtenerData";
import useInyectarReporteDenuncia from "@/customHooks/useInyectarReporteDenuncia";

import { UploadFiles } from "servicios/UploadFiles";
import { sleep } from "servicios/Utils";

import InputText from "@/formulario/InputText";
import RadioInput from "@/formulario/RadioInput";
import RadioInputDetails from "@/formulario/RadioInputDetails";

import DatePickerInput from "@/formulario/DatePickerInput";
import SelectInput from "@/formulario/SelectInput";
import UploadFileDragNDrop from "@/formulario/UploadFileDragNDrop";
import TimePickerInput from "@/formulario/TimePickerInput";
import MultiUsersInput from "@/formulario/MultiUsersInput";

import { InitialValues, ValidationSchema } from "./Validaciones";
import SeccionDatosPersonales from "./SeccionDatosPersonales";
import useSubTiposDenuncia from "@/customHooks/useSubTiposDenuncia";
import SeccionSubTipoDenuncia from "./SeccionSubTipoDenuncia";


export default function FormInyeccionPrueba() {
  const [data, setData] = React.useState(null);


  const [cargando, setCargando] = React.useState(false);

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

  const [tipoImplicadoOptions, loadingTdI, errorTdI] = useObtenerData({
    url: "/api/servicios/tipoImplicadoOptions",
  });

  const [isLoading, resultado, error] = useInyectarReporteDenuncia(data);

  const sendToApi = async (values) => {
    setCargando(true);
    console.log("values", values);
    setData(values);
    setCargando(false);
  };

  //Configuración de Formik
  const formik = useFormik({
    initialValues: InitialValues,
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      //Primero se cargan los archivos a S3 (Las urls de descarga se setean previamente en los values de formik)
      const res = await UploadFiles(values.adjuntos);
      await sleep(1500);
      await sendToApi(values);
      formik.resetForm();
    },
  });

  return (
    <>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} className={styles.seccion}>
              <Typography variant="h6" component="h6">
                Información del denunciante
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              <RadioInput
                name="relacionConEmpresa"
                label="Relación con la empresa"
                value={formik.values.relacionConEmpresa}
                onChange={formik.handleChange}
                options={relacionEmpresaOptions}
                touched={formik.touched.relacionConEmpresa}
                error={formik.errors.relacionConEmpresa}
                row
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputText
                name="comoSeDioCuena"
                label="¿Cómo se dio cuenta?"
                placeholder="Ejemplo: Lo vi, Me sucedió, Lo escuché, etc."
                value={formik.values.comoSeDioCuena}
                onChange={formik.handleChange}
                touched={formik.touched.comoSeDioCuena}
                error={formik.errors.comoSeDioCuena}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <RadioInput
                name="comoDeseaEnviarReporte"
                label="¿Cómo desea enviar su reporte?"
                value={formik.values.comoDeseaEnviarReporte}
                onChange={formik.handleChange}
                options={envioReporteOptions}
                touched={formik.touched.comoDeseaEnviarReporte}
                error={formik.errors.comoDeseaEnviarReporte}
                row
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputText
                name="correoElectronico"
                label="Correo electrónico"
                placeholder="Escriba una dirección válida"
                value={formik.values.correoElectronico}
                onChange={formik.handleChange}
                touched={formik.touched.correoElectronico}
                error={formik.errors.correoElectronico}
              />
            </Grid>

            <SeccionDatosPersonales />

            <Grid item xs={12} md={12} className={styles.seccion}>
              <Typography variant="h6" component="h6">
                Lugar de los hechos
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} md={12}>
              <RadioInput
                name="unidadNegocio"
                label="Unidad de negocio"
                value={formik.values.unidadNegocio}
                onChange={formik.handleChange}
                options={unidadDeNegocioOptions}
                touched={formik.touched.unidadNegocio}
                error={formik.errors.unidadNegocio}
                row
                spacing={1}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputText
                name="dondeSucedieronLosHechos"
                label="¿Dónde sucedieron los hechos?"
                placeholder="Ejemplo: Oficina, Planta, Bodega, Estacionamiento, etc."
                value={formik.values.dondeSucedieronLosHechos}
                onChange={formik.handleChange}
                touched={formik.touched.dondeSucedieronLosHechos}
                error={formik.errors.dondeSucedieronLosHechos}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePickerInput
                name="haceCuantoSucedieronLosHechos"
                label="¿Hace cuánto sucedieron los hechos?"
                value={formik.values.haceCuantoSucedieronLosHechos}
                setFieldValue={formik.setFieldValue}
                touched={formik.touched.haceCuantoSucedieronLosHechos}
                error={formik.errors.haceCuantoSucedieronLosHechos}
                disableFuture
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TimePickerInput
                name="horaAproximada"
                label="Hora aproximada"
                value={formik.values.horaAproximada}
                setFieldValue={formik.setFieldValue}
                touched={formik.touched.horaAproximada}
                error={formik.errors.horaAproximada}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputText
                name="direccionDeLosHechos"
                label="Dirección de los hechos"
                placeholder="Indique la dirección de los hechos"
                value={formik.values.direccionDeLosHechos}
                onChange={formik.handleChange}
                touched={formik.touched.direccionDeLosHechos}
                error={formik.errors.direccionDeLosHechos}
              />
            </Grid>

            <Grid item xs={12} md={12} className={styles.seccion}>
              <Typography variant="h6" component="h6">
                Hechos de la denuncia
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} md={12}>
              <RadioInput
                name="tipoDenuncia"
                label="Seleccione el tipo de denuncia que va a reportar"
                value={formik.values.tipoDenuncia}
                onChange={formik.handleChange}
                options={tipoDenunciaOptions}
                touched={formik.touched.tipoDenuncia}
                error={formik.errors.tipoDenuncia}
                row
              />
            </Grid>

            <SeccionSubTipoDenuncia />

            <Grid item xs={12}>
              <MultiUsersInput
                name="implicados"
                label="Agregar a todas las personas implicadas en la denuncia o reporte"
                value={formik.values.implicados}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <UploadFileDragNDrop
                name="adjuntos"
                fileNames="adjuntosUrls"
                label="Si cuenta con evidencia de la situación, adjúntela aquí"
                setFieldValue={formik.setFieldValue}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputText
                name="quienEstaEntereado"
                label="¿Quién más está enterado del problema?"
                placeholder="Mencione a cualquier persona que esté enterada del problema"
                value={formik.values.quienEstaEntereado}
                onChange={formik.handleChange}
                touched={formik.touched.quienEstaEntereado}
                error={formik.errors.quienEstaEntereado}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputText
                name="detalleEvidencia"
                label="Detalle si sabe o sospecha dónde se puede conseguir más evidencia de la situación"
                placeholder="Ejemplo: Video, fotografía, etc."
                value={formik.values.detalleEvidencia}
                onChange={formik.handleChange}
                touched={formik.touched.detalleEvidencia}
                error={formik.errors.detalleEvidencia}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <InputText
                name="asuntoDenuncia"
                label="Asunto de la denuncia"
                placeholder="Describa en pocas palabras de que trata su denuncia"
                value={formik.values.asuntoDenuncia}
                onChange={formik.handleChange}
                touched={formik.touched.asuntoDenuncia}
                error={formik.errors.asuntoDenuncia}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <InputText
                name="descripcionDetalladaDenuncia"
                label="Descripción detallada de la denuncia"
                placeholder="Describa en forma cronológica y lo más detallado posible todos los hechos de la denuncia respondiendo a preguntas como: ¿Qué?, ¿Quién?, ¿Cuándo?, ¿Dónde?, ¿Cómo?, ¿Por qué?, ¿Con quién?, ¿Cuánto?, etc."
                value={formik.values.descripcionDetalladaDenuncia}
                onChange={formik.handleChange}
                touched={formik.touched.descripcionDetalladaDenuncia}
                error={formik.errors.descripcionDetalladaDenuncia}
                multiline
                maxRows={10}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <RadioInput
                name="primeraVezDenunciaEtica"
                label="¿Es la primera vez que utiliza la línea de denuncia ética?"
                value={formik.values.primeraVezDenunciaEtica}
                onChange={formik.handleChange}
                options={[
                  { id: "Si", description: "SÍ" },
                  { id: "No", description: "No" },
                ]}
                touched={formik.touched.primeraVezDenunciaEtica}
                error={formik.errors.primeraVezDenunciaEtica}
                row
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SelectInput
                name="comoSeEntero"
                label="¿Cómo se enteró de la línea de denuncia ética?"
                value={formik.values.comoSeEntero}
                onChange={formik.handleChange}
                options={lineaDenunciaOptions}
                touched={formik.touched.comoSeEntero}
                error={formik.errors.comoSeEntero}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <LoadingButton
                type="submit"
                fullWidth
                endIcon={<SendIcon />}
                loading={formik.isSubmitting}
                loadingPosition="end"
                variant="contained"
              >
                Enviar al gestor
              </LoadingButton>

              <br></br>
              {error &&
                error.map((err) => (
                  <>
                    <Alert severity="error">{err}</Alert> <br></br>
                  </>
                ))}

              {cargando && <div>Cargando...</div>}
              <br></br>
              {resultado && resultado.mensaje && (
                <Alert severity="success">
                  {"Expediente inyectado correctamente " + resultado?.mensaje}
                </Alert>
              )}
            </Grid>
          </Grid>
        </form>
      </FormikProvider>
    </>
  );
}
