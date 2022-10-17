import useSubTiposDenuncia from "@/customHooks/useSubTiposDenuncia";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import RadioInputDetails from "@/formulario/RadioInputDetails";
import { Grid } from "@mui/material";

export default function SeccionSubTipoDenuncia() {
  const { values, handleChange, touched, errors } = useFormikContext();

  const [tipoDenunciaSeleccionada, setTipoDenunciaSeleccionada] =
    React.useState(null);

  useEffect(() => {
    if (values.tipoDenuncia) {
      setTipoDenunciaSeleccionada(values.tipoDenuncia);
    }
  }, [values.tipoDenuncia]);

  const [subTipoDenuncia, errorTd] = useSubTiposDenuncia({
    url: "/api/servicios/subTipoDenuncia",
    tipoDenuncia: tipoDenunciaSeleccionada,
  });

  return (
    <>
      {values.tipoDenuncia && (
        <Grid item xs={12} md={12}>
          <RadioInputDetails
            name="subTipoDenuncia"
            label="Subtipo de denuncia"
            value={values.subTipoDenuncia}
            onChange={handleChange}
            options={subTipoDenuncia}
            touched={touched.subTipoDenuncia}
            error={errors.subTipoDenuncia}
          />
        </Grid>
      )}
    </>
  );
}
