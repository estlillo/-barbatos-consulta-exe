// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import { obtenerAccessToken } from "./ObtenerToken";

const jsonDocumento = {
  id: 1,
  description: "Carta",
  tipo: "1",
  files: [
    {
      name: "documento.pdf",
      contentType: "application/pdf",
      data: "base64 encoded string",
    },
    {
      name: "documento2.pdf",
      contentType: "application/pdf",
      data: "base64 encoded string",
    },
  ],
};

export default async function handler(req, res) {
  console.log("|||||||||||||||||");
  try {
    const bearerToken = await obtenerAccessToken();

    let visadoresDocumento = [];
    req.body.data.visadores && req.body.data.visadores.map((visador, index) => {
      let visadorDocumento = {
        usuario: visador.usuario,
        orden: index + 1,
      };

      visadoresDocumento.push(visadorDocumento);
    });

    let firmantesDocumento = [];
    req.body.data.firmantes && req.body.data.firmantes.map((firmante, index) => {
      let firmanteDocumento = {
        usuario: firmante.usuario,
        orden: index + 1,
      };

      firmantesDocumento.push(firmanteDocumento);
    });

    let distribucionDocumento = [];
    req.body.data.distribucion && req.body.data.distribucion.map((dis, index) => {
      let disDocumento = {
        usuario: dis.usuario,
        orden: index + 1,
        esGrupo: false,
        observacion: "",
      };

      distribucionDocumento.push(disDocumento);
    });

    const body = {
      emisor: req.body.data.emisorExpediente,
      destinatariosExpediente: [
        {
          usuario: req.body.data.destinatarioExpediente,
          copia: false,
        },
      ],
      destinatarioGrupo: [],
      observaciones: [],
      documentos: [
        {
          tieneProceso: false,
          idProceso: "",
          tipoDocumentoExpediente: 1,
          formatoDocumento: req.body.data.formatoDocumento,
          tipoDocumento: req.body.data.tipoDocumento,
          numero: "",
          numeroDocumentoPapel: req.body.data.numeroExterno,
          fecha: "",
          ciudad: req.body.data.ciudad,
          antecedentes: req.body.data.antecedentes,
          materia: req.body.data.materia,
          reservado: false,
          plazo: "",
          nivelUrgencia: "",
          indicacion: "",
          autor: req.body.data.autor,
          emisor: req.body.data.emisor,
          distinatarios: [
            {
              usuario: req.body.data.destinatarios,
            },
          ],
          parrafos: [
            {
              numero: "1",
              cuerpo: req.body.data.contenido,
              tipoParrafo: 2,
            },
          ],
          adjuntos: [
            {
              data: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
              nombreArchivo: "documento.pdf",
              contentType: "application/pdf",
              materia: "materia de prueba 1",
              tipoDescarga: "url",
            },
          ],
          revisores: [],
          visadores: visadoresDocumento,
          firmantes: firmantesDocumento,
          distribucion: distribucionDocumento,
        },
      ],
    };

    console.log(body)

    axios
      .post("http://testing.exedoc.cl:80/exedoc/rest/api/inyectarDocumento", body, {
        headers: {
          Authorization: bearerToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        res.status(200).json(response.data);
      }).catch(function(error) {
        console.log(error.response.data); 
        res.status(200).json(error.response.data);
      });
  } catch (error) {
    console.log("error");
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
