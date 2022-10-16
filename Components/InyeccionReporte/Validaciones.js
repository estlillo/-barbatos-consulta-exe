import * as yup from "yup";

export const InitialValues = {
  relacionConEmpresa: "",
  comoSeDioCuena: "",
  comoDeseaEnviarReporte: "",
  correoElectronico: "",
  unidadNegocio: "",
  dondeSucedieronLosHechos: "",
  haceCuantoSucedieronLosHechos: new Date(),
  horaAproximada: new Date(),
  direccionDeLosHechos: "",
  tipoDenuncia: "",
  personasImplicadas: "",
  quienEstaEntereado: "",
  detalleEvidencia: "",
  descripcionDetalladaDenuncia: "",
  primeraVezDenunciaEtica: "",
  comoSeEntero: "",
  adjuntos: [],
  adjuntosUrls: [],
};

export const ValidationSchema = yup.object({
 /* correoElectronico: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  comoSeDioCuena: yup.string("Campo obligatorio").required("Campo obligatorio"),
  comoSeEntero: yup.string("Campo obligatorio").required("Campo obligatorio"),
  unidadNegocio: yup.string("Campo obligatorio").required("Campo obligatorio"),
  relacionConEmpresa: yup
    .string("Campo obligatorio")
    .required("Campo obligatorio"),
  haceCuantoSucedieronLosHechos: yup
    .date("Formato incorrecto")
    .required("Campo obligatorio"),

    */
});
