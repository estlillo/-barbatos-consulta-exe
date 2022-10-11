// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import { obtenerAccessToken } from "./ObtenerToken";


export default async function handler(req, res) {
  try {
    const bearerToken = await obtenerAccessToken();

    const defaultUser = "copazo";

    let personasImplicadas = [];
    req.body.data.personasImplicadas && req.body.data.personasImplicadas.map((implicado, index) => {
      let personaImplicada = {
        usuario: implicado.usuario,
        cargo: implicado.cargo,
        tipo: implicado.tipo
      };

      personasImplicadas.push(personaImplicada);
    });

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
      emisor: defaultUser,
      destinatariosExpediente: [
        {
          usuario: defaultUser,
          copia: false,
        },
      ],
      destinatarioGrupo: [],
      observaciones: [],
      documentos: [
        {
          datosReporteDenuncia: {
            relacionConEmpresa: req.body.data.relacionConEmpresa,
            comoSeDioCuena: req.body.data.comoSeDioCuena,
            comoDeseaEnviarReporte: req.body.data.comoDeseaEnviarReporte,
            correoElectronico: req.body.data.correoElectronico,
            unidadNegocio: req.body.data.unidadNegocio,
            dondeSucedieronLosHechos: req.body.data.dondeSucedieronLosHechos,
            haceCuantoSucedieronLosHechos: req.body.data.haceCuantoSucedieronLosHechos,
            horaAproximada: req.body.data.horaAproximada,
            direccionDeLosHechos: req.body.data.direccionDeLosHechos,
            quienEstaEntereado: req.body.data.quienEstaEntereado,
            detalleEvidencia: req.body.data.detalleEvidencia,
            descripcionDetalladaDenuncia: req.body.data.descripcionDetalladaDenuncia,
            primeraVezDenunciaEtica: req.body.data.primeraVezDenunciaEtica,
            comoSeEntero: req.body.data.comoSeEntero,
            implicados: personasImplicadas,
            tipoDenuncia: req.body.data.tipoDenuncia,

          },
          tieneProceso: false, 
          idProceso: "",
          tipoDocumentoExpediente: 1,
          formatoDocumento: 3,
          tipoDocumento: 65,
          numero: "",
          numeroDocumentoPapel: req.body.data.numeroExterno,
          fecha: "",
          ciudad: req.body.data.ciudad,
          antecedentes: "Reporte de denuncia",
          materia: "Reporte de denuncia",
          reservado: false,
          plazo: "",
          nivelUrgencia: "",
          indicacion: "",
          autor: defaultUser,
          emisor: defaultUser,
          distinatarios: [
            {
              usuario: defaultUser,
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
    console.log(body.documentos[0].datosReporteDenuncia);


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
    res.status(500).json({ message: error.message });
  }
}
