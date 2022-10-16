import {
  Alert,
  Grid,
  TextField,
} from "@mui/material";

import React from "react";

import useObtenerData from "@/customHooks/useObtenerData";

const importJodit = () => import("jodit-react");

import dynamic from "next/dynamic";

import {useFormik } from "formik";

import InputText from "../campos-formulario-formik/InputText";
import RadioInput from "../campos-formulario-formik/RadioInput";
import DatePickerInput from "../campos-formulario-formik/DatePickerInput";
import SelectInput from "../campos-formulario-formik/SelectInput";
import useInyectarReporteDenuncia from "@/customHooks/useInyectarReporteDenuncia";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import UploadFileDragNDrop from "../campos-formulario-formik/UploadFileDragNDrop";
import { InitialValues, ValidationSchema } from "./Validaciones";
import { UploadFiles } from "pages/servicios-front/UploadFiles";
import { sleep } from "pages/servicios-front/Utils";
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});



export default function FormInyeccionPrueba() {

  const [data, setData] = React.useState(null);
  const [labelProceso, setLabelProceso] = React.useState("No");
  const [formatoSeleccionado, setFormatoSeleccionado] = React.useState(null);

  const [cargando, setCargando] = React.useState(false);

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

  const [isLoading, resultado, error] = useInyectarReporteDenuncia(data);

  const handleChangeIsProceso = (event) => {
    setIsProceso(event.target.checked);
    if (event.target.checked) {
      setLabelProceso("Sí");
    } else {
      setLabelProceso("No");
    }
  };

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


      //Primero se cargan los archivos a S3 (Las urls de descarga se setean previamente en los values de formik)
      const res = await UploadFiles(values.adjuntos);
    //  console.log("adjuntos ",values.adjuntos);
    //  console.log("adjuntos URLS",values.adjuntosUrls);
      await sleep(1500);
      await sendToApi(values);
     formik.resetForm();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
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

          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12} md={6}>
            <InputText
              name="email"
              label="Email"
              placeholder="Ingrese su email"
              value={formik.values.email}
              onChange={formik.handleChange}
              touched={formik.touched.email}
              error={formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputText
              name="password"
              label="Password"
              type="password"
              placeholder="Ingrese su password"
              value={formik.values.password}
              onChange={formik.handleChange}
              touched={formik.touched.password}
              error={formik.errors.password}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              margin="normal"
              fullWidth
              id="comoSeDioCuena"
              name="comoSeDioCuena"
              label="¿Cómo se dio cuenta?"
              value={formik.values.comoSeDioCuena}
              onChange={formik.handleChange}
              error={
                formik.touched.comoSeDioCuena &&
                Boolean(formik.errors.comoSeDioCuena)
              }
              helperText={
                formik.touched.comoSeDioCuena && formik.errors.comoSeDioCuena
              }
            />
          </Grid>
       
          <Grid item xs={12} md={12}>
            <UploadFileDragNDrop
              name="adjuntos"
              label="Adjuntar archivos"
              setFieldValue={formik.setFieldValue}
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
    </>
  );
}
