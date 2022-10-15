import { Button, Grid, TextField } from "@mui/material";

import React from "react";

import useObtenerData from "@/customHooks/useObtenerData";

const importJodit = () => import("jodit-react");

import dynamic from "next/dynamic";

import { Formik, useFormik } from "formik";
import * as yup from "yup";

import InputText from "../campos-formulario-formik/InputText";
import RadioInput from "../campos-formulario-formik/RadioInput";
import DatePickerInput from "../campos-formulario-formik/DatePickerInput";
import SelectInput from "../campos-formulario-formik/SelectInput";
import UploadFiles from "../campos-formulario-formik/UploadFiles";
import InyectarReporteRenunciaService from "pages/servicios-front/InyectarReporteRenunciaService";
import useInyectarReporteDenuncia from "@/customHooks/useInyectarReporteDenuncia";
import axios from "axios";

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  comoSeDioCuena: yup.string("Campo obligatorio"),
});

export default function FormInyeccionPrueba() {
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
    console.log("enviando a la api");

    console.log(values);

    setData(values);

    // const result = await InyectarReporteRenunciaService.inyectarReporteDenuncia(values);

    console.log("finaliza envio a api");

    console.log(resultado);
  };

  const uploadFiles = async (values) => {
    const res = values.adjuntos.map(async (file, index) => {
      console.log("simula subir archivo");
      const s3result = await uploadFileToS3(file, index);
      console.log(s3result);
    });
  };

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const uploadFileToS3 = async (file, index) => {
    console.log("UPLOADING FILE " + index);
    const formData = new FormData();
    formData.append("file", file);
    const result = await axios.post(
      "http://localhost:3001/api/files",
      formData
    );

    console.log("FINISH UPLOADING FILE " + index);

    return result;
  };

  const formik = useFormik({
    initialValues: {
      email: "mail@mail.com",
      password: "foobar2313123",
      comoSeDioCuena: "foobar2",
      age: "Empleado",
      gender: "female",
      haceCuantoSucedieronLosHechos: new Date(),
      relacionConEmpresa: "",
      comoSeEntero: "",
      unidadNegocio: "",
      adjuntos: [],
      adjuntosUrls: [],
      adjuntosOtros: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      uploadFiles(values);
      console.log("esperando 5 segundos");
      await sleep(5000);
      console.log("termino de esperar");
      sendToApi(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <DatePickerInput
              name="haceCuantoSucedieronLosHechos"
              label="¿Hace cuánto sucedieron los hechos? test"
              value={formik.values.haceCuantoSucedieronLosHechos}
              setFieldValue={formik.setFieldValue}
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
            <UploadFiles name="adjuntos" setFieldValue={formik.setFieldValue} />
          </Grid>

          <Grid item xs={12} md={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
