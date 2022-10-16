import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import { useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function MyApp({ Component, pageProps }) {
  const [siteKey, setSiteKey] = useState("");

  useEffect(() => {
    fetch("/api/obtenerVariablesCliente")
      .then((res) => res.json())
      .then((resultado) => {
        console.log("siteKey: " + resultado.siteKey);
        setSiteKey(resultado.siteKey);
      });
  }, []);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
