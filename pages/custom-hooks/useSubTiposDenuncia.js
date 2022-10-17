// useAxios hook (first draft)

import { useState, useEffect } from "react";
import axios from "axios";

const useSubTiposDenuncia = ({ url, tipoDenuncia }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    console.log("useSubTipoDenuncia " + url + " params "+ tipoDenuncia);
    axios
      .get(url,{ params: { tipoDenuncia } })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  }, [url, tipoDenuncia]);

  // custom hook returns value
  return [response, loading, error];
};

export default useSubTiposDenuncia;
