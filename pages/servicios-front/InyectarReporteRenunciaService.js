import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function inyectarReporteDenuncia(data){
  const { executeRecaptcha } = useGoogleReCaptcha();

  executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
    axios
      .post("/api/validarGoogleCaptcha", {
        gReCaptchaToken,
      })
      .then((res) => {
        if (res?.data?.status === "success") {
          axios
            .post("/api/inyectarReporteDenuncia", {
              data,
            })
            .then((response) => {
              if (response.data?.codigo === "500")
                setError(response.data.errores);
              if (response.data?.codigo === "200") {
                setError([]);
                setResultado(response.data);
              }
            });

          setResultado(res?.message);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });
};


