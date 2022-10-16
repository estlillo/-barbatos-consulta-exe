import * as yup from "yup";

export const InitialValues = {
    email: "estebanlilloc@gmail.com",
    password: "sdfsdfdsfdsfsdf987",
    comoSeDioCuena: "Test",
    age: "Empleado",
    gender: "female",
    haceCuantoSucedieronLosHechos: new Date(),
    relacionConEmpresa: "",
    comoSeEntero: "",
    unidadNegocio: "",
    adjuntos: [],
    adjuntosOld: [],
    adjuntosUrls: [],
    adjuntosOldUrls: [],
    adjuntosOtros: [],
}

export const ValidationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  comoSeDioCuena: yup.string("Campo obligatorio").required("Campo obligatorio"),
  comoSeEntero: yup.string("Campo obligatorio").required("Campo obligatorio"),
  unidadNegocio: yup.string("Campo obligatorio").required("Campo obligatorio"),
  relacionConEmpresa: yup.string("Campo obligatorio").required("Campo obligatorio"),
  haceCuantoSucedieronLosHechos: yup.date("Formato incorrecto").required("Campo obligatorio"),
});


