import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function useInyectarReporteDenuncia(data) {
  const [resultado, setResultado] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const submitEnquiryForm = (gReCaptchaToken) => {
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

              if(response.data?.codigo === "500") setError(response.data.errores);
              if(response.data?.codigo === "200"){
                setError([]);
                setResultado(response.data)
              }
            });

          setResultado(res?.message);
        }
      }).catch((err) => {
        setError(err);
      }).finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (data) {
      setResultado([]);
      setIsLoading(true);
      if (!executeRecaptcha) {
        return;
      }

      executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
        submitEnquiryForm(gReCaptchaToken);
      });
    }
  }, [data]);
  return [isLoading, resultado, error];
}
