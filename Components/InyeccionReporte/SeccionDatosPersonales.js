import { Grid } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";
import InputText from "../campos-formulario-formik/InputText";
import RadioInput from "../campos-formulario-formik/RadioInput";

export default function SeccionDatosPersonales() {
  const { values, handleChange, touched, errors } =
    useFormikContext();

  return (
    <>
      {values.comoDeseaEnviarReporte &&
        values.comoDeseaEnviarReporte === "Dar mis datos personales" && (
          <>
            <Grid item xs={12} md={12}>
              <InputText
                name="nombreCompleto"
                label="Nombre completo"
                placeholder="Escriba su nombre completo"
                value={values.nombreCompleto}
                onChange={handleChange}
                touched={touched.nombreCompleto}
                error={errors.nombreCompleto}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <RadioInput
                name="sexo"
                label="Sexo"
                value={values.sexo}
                onChange={handleChange}
                options={[
                  { id: "Femenino", description: "Femenino" },
                  { id: "Masculino", description: "Masculino" },
                ]}
                touched={touched.sexo}
                error={errors.sexo}
                row
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputText
                name="telefonoMovil"
                label="Teléfono móvil"
                placeholder="A 10 dígitos"
                value={values.telefonoMovil}
                onChange={handleChange}
                touched={touched.telefonoMovil}
                error={errors.telefonoMovil}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputText
                name="telefonoFijo"
                label="Teléfono fijo"
                placeholder="Incluya lada ejemplo: (52)(55)"
                value={values.telefonoFijo}
                onChange={handleChange}
                touched={touched.telefonoFijo}
                error={errors.telefonoFijo}
              />
            </Grid>
          </>
        )}
    </>
  );
}
